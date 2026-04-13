import { desc, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { orders, users } from "../db/schema.js";

const WASTE_PRICING = {
  paper: 12,
  plastic: 20,
  glass: 5,
  mixed: 15,
};

const BUSINESS_BASE_PRICING = {
  monthly: 3000,
  quarterly: 8500,
  yearly: 30000,
  on_demand: 1800,
};

const SERVICE_TYPE_MULTIPLIER = {
  general: 1,
  industrial: 1.4,
  biomedical: 1.8,
  consulting: 1.2,
};

const ORDER_STATUSES = ["pending", "confirmed", "in_progress", "completed", "cancelled"];
const CANCEL_WINDOW_MS = 24 * 60 * 60 * 1000;

function isCancellationAllowed(order) {
  if (!order?.scheduledFor) {
    return true;
  }

  const scheduled = new Date(order.scheduledFor);
  if (Number.isNaN(scheduled.getTime())) {
    return true;
  }

  return scheduled.getTime() - Date.now() >= CANCEL_WINDOW_MS;
}

function toNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseEstimatedWeight(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const text = String(value || "").trim().toLowerCase();
  if (!text) {
    return 0;
  }

  const matches = text.match(/\d+(?:\.\d+)?/g);
  if (!matches || matches.length === 0) {
    return 0;
  }

  const numbers = matches.map((part) => Number.parseFloat(part)).filter(Number.isFinite);
  if (numbers.length === 0) {
    return 0;
  }

  if (numbers.length >= 2 && text.includes("-")) {
    return (numbers[0] + numbers[1]) / 2;
  }

  return numbers[0];
}

function calculateCommercialAmount({ subscriptionModel, serviceType, tier }) {
  const normalizedSubscription = String(subscriptionModel || "").trim().toLowerCase();
  const normalizedServiceType = String(serviceType || "").trim().toLowerCase();

  const base = BUSINESS_BASE_PRICING[normalizedSubscription] || 0;
  const serviceMultiplier = SERVICE_TYPE_MULTIPLIER[normalizedServiceType] || 1;
  const tierMultiplier = tier === "enterprise" ? 2.2 : 1;

  return base * serviceMultiplier * tierMultiplier;
}

function mapOrderToUi(order) {
  let extra = {};
  if (order.notes) {
    try {
      extra = JSON.parse(order.notes);
    } catch {
      extra = {};
    }
  }

  return {
    id: order.id,
    userId: order.userId,
    type:
      order.orderType === "residential"
        ? "Household"
        : order.orderType === "enterprise"
          ? "Enterprise"
          : "Business",
    status: order.status,
    createdDate: order.createdAt,
    pickupDate: order.scheduledFor,
    amount: Number(order.amount),
    address: order.address,
    serviceName: order.serviceName,
    estimatedWeight: extra.estimatedWeight ?? "",
    wasteType: extra.wasteType ?? "",
    companyName: extra.companyName ?? "",
    contactPerson: extra.contactPerson ?? "",
    serviceType: extra.serviceType ?? "",
    subscriptionModel: extra.subscriptionModel ?? "",
    phone: extra.phone ?? "",
  };
}

export async function createResidentialOrder(payload) {
  const { userId, address, phone, wasteType, pickupDate, estimatedWeight } = payload;

  if (!userId || !address || !phone || !wasteType || !pickupDate) {
    throw new Error("userId, address, phone, wasteType and pickupDate are required");
  }

  const weight = parseEstimatedWeight(estimatedWeight);
  const amount = weight * (WASTE_PRICING[wasteType] || 0);

  const created = await db
    .insert(orders)
    .values({
      userId,
      orderType: "residential",
      serviceName: wasteType,
      address,
      amount: amount.toFixed(2),
      status: "confirmed",
      scheduledFor: new Date(pickupDate),
      notes: JSON.stringify({
        phone,
        wasteType,
        estimatedWeight: String(estimatedWeight || ""),
      }),
    })
    .returning();

  return mapOrderToUi(created[0]);
}

export async function createBusinessOrder(payload) {
  const {
    userId,
    companyName,
    contactPerson,
    address,
    phone,
    serviceType,
    description,
    subscriptionModel,
  } = payload;

  if (!userId || !companyName || !contactPerson || !address || !phone || !serviceType || !subscriptionModel) {
    throw new Error("userId, companyName, contactPerson, address, phone, serviceType and subscriptionModel are required");
  }

  const amount = calculateCommercialAmount({
    subscriptionModel,
    serviceType,
    tier: "business",
  });

  const created = await db
    .insert(orders)
    .values({
      userId,
      orderType: "business",
      serviceName: serviceType,
      address,
      amount: amount.toFixed(2),
      status: "pending",
      notes: JSON.stringify({
        phone,
        companyName,
        contactPerson,
        serviceType,
        subscriptionModel,
        description: description || "",
      }),
    })
    .returning();

  return mapOrderToUi(created[0]);
}

export async function createEnterpriseOrder(payload) {
  const {
    userId,
    companyName,
    contactPerson,
    address,
    phone,
    serviceType,
    description,
    subscriptionModel,
  } = payload;

  if (!userId || !companyName || !contactPerson || !address || !phone || !serviceType || !subscriptionModel) {
    throw new Error("userId, companyName, contactPerson, address, phone, serviceType and subscriptionModel are required");
  }

  const amount = calculateCommercialAmount({
    subscriptionModel,
    serviceType,
    tier: "enterprise",
  });

  const created = await db
    .insert(orders)
    .values({
      userId,
      orderType: "enterprise",
      serviceName: serviceType,
      address,
      amount: amount.toFixed(2),
      status: "pending",
      notes: JSON.stringify({
        phone,
        companyName,
        contactPerson,
        serviceType,
        subscriptionModel,
        description: description || "",
      }),
    })
    .returning();

  return mapOrderToUi(created[0]);
}

export async function getOrdersByUserId(userId) {
  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, Number(userId)))
    .orderBy(desc(orders.createdAt));

  return userOrders.map(mapOrderToUi);
}

export async function getAllOrders() {
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  return allOrders.map(mapOrderToUi);
}

export async function updateOrderStatusById({ orderId, status }) {
  if (!orderId || !Number.isFinite(orderId)) {
    throw new Error("Valid orderId is required");
  }

  const normalizedStatus = String(status || "").trim().toLowerCase();
  if (!ORDER_STATUSES.includes(normalizedStatus)) {
    throw new Error("Invalid order status");
  }

  const [existing] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, Number(orderId)))
    .limit(1);

  if (!existing) {
    throw new Error("Order not found");
  }

  if (normalizedStatus === "cancelled" && !isCancellationAllowed(existing)) {
    throw new Error("Cancellation is only allowed 24 hours before pickup");
  }

  const updated = await db
    .update(orders)
    .set({ status: normalizedStatus, updatedAt: new Date() })
    .where(eq(orders.id, Number(orderId)))
    .returning();

  if (!updated.length) {
    throw new Error("Order not found");
  }

  return mapOrderToUi(updated[0]);
}

export async function cancelOrderByUserId({ orderId, userId }) {
  if (!orderId || !Number.isFinite(orderId)) {
    throw new Error("Valid orderId is required");
  }

  const [existing] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, Number(orderId)))
    .limit(1);

  if (!existing || Number(existing.userId) !== Number(userId)) {
    throw new Error("Order not found");
  }

  if (["cancelled", "completed"].includes(existing.status)) {
    throw new Error("Order cannot be cancelled");
  }

  if (!isCancellationAllowed(existing)) {
    throw new Error("Cancellation is only allowed 24 hours before pickup");
  }

  const updated = await db
    .update(orders)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(eq(orders.id, Number(orderId)))
    .returning();

  return mapOrderToUi(updated[0]);
}

export async function getDashboardByUserId(userId) {
  const [userRecord] = await db
    .select({ id: users.id, fullName: users.fullName })
    .from(users)
    .where(eq(users.id, Number(userId)))
    .limit(1);

  if (!userRecord) {
    return { error: "User not found", statusCode: 404 };
  }

  const userOrders = await getOrdersByUserId(userId);

  const totalWeight = userOrders.reduce((sum, req) => {
    const value = parseEstimatedWeight(req.estimatedWeight);
    return sum + value;
  }, 0);

  const totalEarning = userOrders.reduce((sum, req) => {
    if (req.type === "Household" && ["confirmed", "completed", "in_progress"].includes(req.status)) {
      const amount = Number(req.amount || 0);
      if (amount > 0) {
        return sum + amount;
      }

      const parsedWeight = parseEstimatedWeight(req.estimatedWeight);
      const unitPrice = WASTE_PRICING[String(req.wasteType || "").toLowerCase()] || 0;
      return sum + parsedWeight * unitPrice;
    }
    return sum;
  }, 0);

  const pendingCount = userOrders.filter((req) => ["pending", "confirmed", "in_progress"].includes(req.status)).length;
  const completedCount = userOrders.filter((req) => req.status === "completed").length;

  const upcoming = userOrders
    .filter((req) => ["pending", "confirmed", "in_progress"].includes(req.status))
    .sort((a, b) => new Date(a.pickupDate || a.createdDate) - new Date(b.pickupDate || b.createdDate));

  return {
    user: userRecord,
    metrics: {
      totalWeight,
      totalEarning,
      pendingCount,
      completedCount,
      totalRequests: userOrders.length,
    },
    nextPickup: upcoming[0] || null,
    requests: userOrders,
  };
}
