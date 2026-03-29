import {
  createEnterpriseOrder,
  createBusinessOrder,
  createResidentialOrder,
  getDashboardByUserId,
  getOrdersByUserId,
} from "../service/orderService.js";

export async function createResidential(req, res) {
  try {
    const payload = {
      ...(req.body || {}),
      userId: Number(req.user.id),
    };
    const data = await createResidentialOrder(payload);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed to create residential order" });
  }
}

export async function createBusiness(req, res) {
  try {
    const payload = {
      ...(req.body || {}),
      userId: Number(req.user.id),
    };
    const data = await createBusinessOrder(payload);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed to create business order" });
  }
}

export async function createEnterprise(req, res) {
  try {
    const payload = {
      ...(req.body || {}),
      userId: Number(req.user.id),
    };
    const data = await createEnterpriseOrder(payload);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed to create enterprise order" });
  }
}

export async function getUserOrders(req, res) {
  try {
    const data = await getOrdersByUserId(req.user.id);
    return res.json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed to fetch user orders" });
  }
}

export async function getDashboard(req, res) {
  try {
    const data = await getDashboardByUserId(req.user.id);

    if (data?.error) {
      return res.status(data.statusCode || 400).json({ error: data.error });
    }

    return res.json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed to fetch dashboard" });
  }
}
