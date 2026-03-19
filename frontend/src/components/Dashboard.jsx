import React, { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createPageUrl, getRequestsByUserName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import {
    CalendarCheck,
    Truck,
    DollarSign,
    Target,
    Users,
    ArrowRight,
    Loader2
} from "lucide-react";

// Mock pricing/weight values for calculation
const WASTE_PRICING = {
    paper: 12, // Rs/kg
    plastic: 20,
    glass: 5,
    mixed: 15,
};

function calculateMetrics(requests) {
    let totalWeight = 0;
    let totalEarning = 0;
    let pendingCount = 0;
    let completedCount = 0;

    requests.forEach(req => {
        // Simple heuristic to extract estimated weight from text field like "5-10 kg"
        const weightMatch = req.estimatedWeight?.match(/(\d+)/);
        const weight = weightMatch ? parseInt(weightMatch[1]) : 0;
        totalWeight += weight;

        // Calculate potential earnings only for Household users
        if (req.type === 'Household' && (req.status === 'confirmed' || req.status === 'completed')) {
            const pricePerKg = WASTE_PRICING[req.wasteType] || 0;
            totalEarning += weight * pricePerKg;
        }

        if (req.status === 'pending' || req.status === 'confirmed') {
            pendingCount++;
        } else if (req.status === 'completed') {
            completedCount++;
        }
    });

    const upcomingRequests = requests
        .filter(req => req.status === 'confirmed' || req.status === 'pending')
        .sort((a, b) => new Date(a.pickupDate || a.createdDate) - new Date(b.pickupDate || b.createdDate));

    // Find the next scheduled pickup date
    const nextPickup = upcomingRequests[0];

    return {
        totalWeight,
        totalEarning,
        pendingCount,
        completedCount,
        nextPickup,
        requests
    };
}


export default function Dashboard() {
    const { user } = useAuth();

    // Fetch and calculate metrics
    const allRequests = getRequestsByUserName(user);
    const {
        totalWeight,
        totalEarning,
        pendingCount,
        completedCount,
        nextPickup,
        requests
    } = useMemo(() => calculateMetrics(allRequests), [allRequests, user]);

    // Determine user type for dynamic actions and metrics display
    const isHouseholdUser = allRequests.some(r => r.type === 'Household');
    const isBusinessUser = allRequests.some(r => r.type === 'Business');

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
                Welcome back, <span className="text-green-600">{user}</span>!
            </h1>
            <p className="text-gray-500 mb-8">Your impact and scheduled services at a glance.</p>

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
                                    Status: <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 capitalize" variant="secondary">{nextPickup.status}</Badge>
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
                        <DollarSign className="w-6 h-6 text-green-600 mb-3" />
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
                        <div className="text-3xl font-bold text-gray-900">{requests.length}</div>
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
                                    className={`capitalize ${req.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300'}`}
                                    variant="secondary"
                                >
                                    {req.status}
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