import { desc, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { orders, users } from "../db/schema.js";

const WASTE_PRICING = {
  paper: 12,
  plastic: 20,
  glass: 5,
  mixed: 15,
};

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
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

  const weight = toNumber(estimatedWeight);
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

  const created = await db
    .insert(orders)
    .values({
      userId,
      orderType: "business",
      serviceName: serviceType,
      address,
      amount: "0.00",
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

  const created = await db
    .insert(orders)
    .values({
      userId,
      orderType: "enterprise",
      serviceName: serviceType,
      address,
      amount: "0.00",
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
    const value = toNumber(req.estimatedWeight);
    return sum + value;
  }, 0);

  const totalEarning = userOrders.reduce((sum, req) => {
    if (req.type === "Household" && ["confirmed", "completed", "in_progress"].includes(req.status)) {
      return sum + Number(req.amount || 0);
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
