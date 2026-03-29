import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { XCircle, CheckCircle, Clock } from "lucide-react";
import { api } from "@/lib/api";

export default function OrderHistory() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function loadOrders() {
            if (!user?.id) return;
            try {
                const response = await api.getOrdersByUser();
                setOrders(response);
            } catch {
                setOrders([]);
            }
        }

        loadOrders();
    }, [user?.id]);

    const sortedRequests = [...orders].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

    const getStatusInfo = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return { text: "Completed", color: "text-green-600", badgeClass: "bg-green-100 text-green-800", icon: CheckCircle };
            case 'confirmed':
                return { text: "Confirmed", color: "text-blue-500", badgeClass: "bg-blue-100 text-blue-800", icon: Clock };
            case 'pending':
                return { text: "Pending", color: "text-yellow-500", badgeClass: "bg-yellow-100 text-yellow-800", icon: Clock };
            case 'in_progress':
                return { text: "In Progress", color: "text-indigo-500", badgeClass: "bg-indigo-100 text-indigo-800", icon: Clock };
            default:
                return { text: "Cancelled", color: "text-red-500", badgeClass: "bg-red-100 text-red-800", icon: XCircle };
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4 min-h-screen bg-white">
            <h2 className="text-3xl font-bold text-green-700 mb-6">Your Service History</h2>

            {!sortedRequests.length && (
                <div className="text-center p-10 bg-gray-50 rounded-lg">
                    <p className="text-xl text-gray-500">You have no service requests yet. Start your recycling journey!</p>
                </div>
            )}

            {sortedRequests.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const Icon = statusInfo.icon;
                const date = new Date(order.pickupDate || order.createdDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

                return (
                    <Card key={order.id} className="shadow-sm hover:shadow-md transition-shadow border-l-4" style={{borderColor: statusInfo.color}}>
                        <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 capitalize text-lg">
                                    {order.type === 'Household' ?
                                        `Residential Pickup: ${order.wasteType}` :
                                        `${order.type} Request: ${order.companyName || 'N/A'}`
                                    }
                                </p>
                                <p className="text-sm text-gray-500">
                                    {order.type === 'Household' ?
                                        `Waste: ${order.estimatedWeight}` :
                                        `Service: ${order.serviceType}`
                                    }
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-600">Date</p>
                                    <p className="font-medium text-gray-800">{date}</p>
                                </div>
                                <Badge
                                    className={`capitalize px-3 py-1 text-sm font-semibold ${statusInfo.badgeClass}`}
                                    variant="secondary"
                                >
                                    {/* FIX: Wrap Icon and text in a single <span> to avoid the React.Children.only error */}
                                    <span className="flex items-center">
                                        <Icon className="w-4 h-4 mr-1" />
                                        {statusInfo.text}
                                    </span>
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}