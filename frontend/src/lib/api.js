const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("ecowaste_token");
}

async function request(path, options = {}) {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

export const api = {
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  registerAdmin: (payload) => request("/auth/register-admin", { method: "POST", body: JSON.stringify(payload) }),
  createResidential: (payload) => request("/orders/residential", { method: "POST", body: JSON.stringify(payload) }),
  createBusiness: (payload) => request("/orders/business", { method: "POST", body: JSON.stringify(payload) }),
  createEnterprise: (payload) => request("/orders/enterprise", { method: "POST", body: JSON.stringify(payload) }),
  getDashboard: () => request("/orders/dashboard/me"),
  getOrdersByUser: () => request("/orders/user/me"),
  getAllOrders: () => request("/orders"),
  cancelOrder: (orderId) => request(`/orders/${orderId}/cancel`, { method: "PATCH" }),
  updateOrderStatus: (orderId, status) =>
    request(`/orders/${orderId}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
};
