import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, RefreshCcw } from "lucide-react";
import { api } from "@/lib/api";

const STATUS_OPTIONS = ["pending", "confirmed", "picked_up", "recycled", "cancelled"];
const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  picked_up: "Picked up",
  recycled: "Recycled",
  cancelled: "Cancelled",
};
const API_STATUS_MAP = {
  picked_up: "in_progress",
  recycled: "completed",
};
const UI_STATUS_MAP = {
  in_progress: "picked_up",
  completed: "recycled",
};

function toUiStatus(status) {
  const normalized = String(status || "").trim().toLowerCase();
  return UI_STATUS_MAP[normalized] || normalized;
}

function toApiStatus(status) {
  const normalized = String(status || "").trim().toLowerCase();
  return API_STATUS_MAP[normalized] || normalized;
}

function getStatusClass(status) {
  switch (status) {
    case "recycled":
      return "bg-green-100 text-green-800 border-green-300";
    case "confirmed":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "picked_up":
      return "bg-indigo-100 text-indigo-800 border-indigo-300";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
  }
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadOrders() {
    setLoading(true);
    setErrorMessage("");
    try {
      const data = await api.getAllOrders();
      setOrders(data);
    } catch (error) {
      setErrorMessage(error.message || "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const summary = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        const uiStatus = toUiStatus(order.status);
        acc.total += 1;
        acc[uiStatus] = (acc[uiStatus] || 0) + 1;
        return acc;
      },
      { total: 0 }
    );
  }, [orders]);

  const revenueTotal = useMemo(() => {
    return orders.reduce((sum, order) => sum + Number(order.amount || 0), 0);
  }, [orders]);

  const typeSummary = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        const key = order.type || "Unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {}
    );
  }, [orders]);

  async function handleStatusChange(orderId, status) {
    setUpdatingId(orderId);
    try {
      const updated = await api.updateOrderStatus(orderId, toApiStatus(status));
      setOrders((prev) => prev.map((order) => (order.id === updated.id ? updated : order)));
    } catch (error) {
      setErrorMessage(error.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">Review and update pickup requests.</p>
        </div>
        <Button onClick={loadOrders} className="bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
          <RefreshCcw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-t-4 border-green-500">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-semibold text-gray-900">{summary.total || 0}</p>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-emerald-500">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">₹{revenueTotal.toFixed(2)}</p>
          </CardContent>
        </Card>
        {STATUS_OPTIONS.map((status) => (
          <Card key={status} className="border-t-4 border-gray-200">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">{STATUS_LABELS[status]}</p>
              <p className="text-2xl font-semibold text-gray-900">{summary[status] || 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {STATUS_OPTIONS.map((status) => {
              const count = summary[status] || 0;
              const percentage = summary.total ? Math.round((count / summary.total) * 100) : 0;
              return (
                <div key={status}>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>{STATUS_LABELS[status]}</span>
                    <span>{count} ({percentage}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Order Mix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(typeSummary).map(([type, count]) => {
              const percentage = summary.total ? Math.round((count / summary.total) * 100) : 0;
              return (
                <div key={type}>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>{type}</span>
                    <span>{count} ({percentage}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {!Object.keys(typeSummary).length ? (
              <p className="text-sm text-gray-500">No order data available.</p>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">All Service Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading orders...
            </div>
          ) : null}

          {!loading && orders.length === 0 ? (
            <p className="text-gray-500">No orders available.</p>
          ) : null}

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b pb-4"
              >
                <div>
                  {(() => {
                    const uiStatus = toUiStatus(order.status);
                    return (
                      <>
                  <p className="font-semibold text-gray-800">
                    {order.type === "Household"
                      ? `Residential Pickup: ${order.wasteType}`
                      : `${order.type} Request: ${order.companyName || "Business"}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.type === "Household"
                      ? `Weight: ${order.estimatedWeight || "-"} kg`
                      : `Service: ${order.serviceType || "-"}`}
                  </p>
                  <p className="text-sm text-gray-500">Address: {order.address || "-"}</p>
                      <Badge className={`mt-2 capitalize ${getStatusClass(uiStatus)}`} variant="secondary">
                        {STATUS_LABELS[uiStatus] || uiStatus.replace("_", " ")}
                      </Badge>
                    </>
                    );
                  })()}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Select
                    value={toUiStatus(order.status)}
                    onValueChange={(value) => handleStatusChange(order.id, value)}
                    disabled={updatingId === order.id}
                  >
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {STATUS_LABELS[status]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {updatingId === order.id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
