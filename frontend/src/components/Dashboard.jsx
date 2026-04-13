import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createPageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
    CalendarCheck,
    Truck,
    IndianRupee,
    Target,
    Users,
    ArrowRight,
    Loader2,
} from "lucide-react";
import { api } from "@/lib/api";

export default function Dashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        metrics: {
            totalWeight: 0,
            totalEarning: 0,
            pendingCount: 0,
            completedCount: 0,
            totalRequests: 0,
        },
        nextPickup: null,
        requests: [],
    });

    useEffect(() => {
        async function loadDashboard() {
            if (!user?.id) return;
            setLoading(true);
            try {
                const response = await api.getDashboard();
                setDashboardData(response);
            } catch {
                setDashboardData((prev) => ({ ...prev, requests: [] }));
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [user?.id]);

    const { metrics, nextPickup, requests } = dashboardData;

    const statusLabels = {
        pending: "Pending",
        confirmed: "Confirmed",
        in_progress: "Picked up",
        completed: "Recycled",
        cancelled: "Cancelled",
    };

    const formatStatus = (status) => statusLabels[String(status || "").toLowerCase()] || status;

    const totalWeight = metrics.totalWeight || 0;
    const totalEarning = metrics.totalEarning || 0;
    const pendingCount = metrics.pendingCount || 0;
    const completedCount = metrics.completedCount || 0;
    const totalRequests = metrics.totalRequests || 0;

    const isHouseholdUser = requests.some((r) => r.type === 'Household');
    const isBusinessUser = requests.some((r) => r.type === 'Business' || r.type === 'Enterprise');

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-12 w-12 text-green-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back, <span className="text-green-600">{user.fullName}</span>!
            </h1>
            <p className="text-gray-500 mb-8">Your impact and scheduled services at a glance.</p>

            {loading && (
                <div className="mb-6 flex items-center gap-2 text-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading dashboard...</span>
                </div>
            )}

            {/* Action Card & Next Pickup */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">

                {/* Book New Pickup Card */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow lg:col-span-2 border-l-4 border-green-600">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl text-green-700">
                            <CalendarCheck className="w-5 h-5" />
                            Schedule Your Next Service
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <p className="text-gray-600 mb-2">
                                Ready to recycle more or manage more of your business waste?
                            </p>
                            {/* Dynamic link based on requests made */}
                            <Link to={isBusinessUser ? createPageUrl("Business") : createPageUrl("Residential")}>
                                <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    Book New Pickup/Request
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Pickup Card (or Info Card) */}
                <Card className="shadow-lg border-l-4 border-blue-500">
                    <CardHeader>
                        <CardTitle className="text-xl text-blue-700">
                            <Truck className="w-5 h-5 mr-2 inline" />
                            Upcoming Service
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {nextPickup ? (
                            <>
                                <p className="font-semibold text-lg">{nextPickup.type === 'Household' ? 'Residential Pickup' : 'Commercial Request'}</p>
                                <p className="text-gray-600">
                                    Date: <span className="font-medium text-gray-800">{new Date(nextPickup.pickupDate || nextPickup.createdDate).toDateString()}</span>
                                </p>
                                <p className="text-gray-600">
                                    Status: <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300" variant="secondary">{formatStatus(nextPickup.status)}</Badge>
                                </p>
                            </>
                        ) : (
                            <p className="text-gray-600">No upcoming service scheduled.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Metrics Section */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Impact & Metrics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Metric 1: Total Weight */}
                <Card className="bg-white shadow-md border-t-4 border-green-500">
                    <CardContent className="p-5">
                        <Target className="w-6 h-6 text-green-600 mb-3" />
                        <div className="text-3xl font-bold text-gray-900">{totalWeight} kg</div>
                        <p className="text-sm text-gray-500">Total Waste Recycled</p>
                    </CardContent>
                </Card>

                {/* Metric 2: Total Earning/Value */}
                <Card className="bg-white shadow-md border-t-4 border-green-500">
                    <CardContent className="p-5">
                        <IndianRupee className="w-6 h-6 text-green-600 mb-3" />
                        <div className="text-3xl font-bold text-gray-900">
                            {isHouseholdUser ? `₹${totalEarning}` : `${completedCount} Completed`}
                        </div>
                        <p className="text-sm text-gray-500">{isHouseholdUser ? 'Potential Earnings' : 'Completed Requests'}</p>
                    </CardContent>
                </Card>

                {/* Metric 3: Pending Requests */}
                <Card className="bg-white shadow-md border-t-4 border-yellow-500">
                    <CardContent className="p-5">
                        <Loader2 className="w-6 h-6 text-yellow-600 mb-3" />
                        <div className="text-3xl font-bold text-gray-900">{pendingCount}</div>
                        <p className="text-sm text-gray-500">Pending Services</p>
                    </CardContent>
                </Card>

                {/* Metric 4: Total Requests */}
                <Card className="bg-white shadow-md border-t-4 border-blue-500">
                    <CardContent className="p-5">
                        <Users className="w-6 h-6 text-blue-600 mb-3" />
                        <div className="text-3xl font-bold text-gray-900">{totalRequests}</div>
                        <p className="text-sm text-gray-500">Total Services Requested</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Section (Simplified list of recent requests) */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {requests.slice(0, 5).map(req => (
                            <div key={req.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                                <div>
                                    <p className="font-semibold text-gray-800 capitalize">
                                        {req.type === 'Household' ?
                                            `${req.wasteType} - ${req.estimatedWeight}` :
                                            `${req.companyName || 'Business Request'} (${req.serviceType})`
                                        }
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {req.type === 'Household' ?
                                            `Pickup: ${new Date(req.pickupDate).toDateString()}` :
                                            `Request: ${new Date(req.createdDate).toDateString()}`
                                        }
                                    </p>
                                </div>
                                <Badge
                                    className={`${req.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300'}`}
                                    variant="secondary"
                                >
                                    {formatStatus(req.status)}
                                </Badge>
                            </div>
                        ))}
                        {!requests.length && (
                            <p className="text-center text-gray-500 py-4">No requests found. Book your first service!</p>
                        )}
                        {requests.length > 0 && (
                            <div className="text-right pt-2">
                                <Link to={createPageUrl("Orders")} className="text-green-600 hover:text-green-700 font-medium text-sm">
                                    View All Orders &rarr;
                                </Link>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}