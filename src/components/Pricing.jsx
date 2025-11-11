import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Pricing() {
    const plans = [
        {
            name: "Residential",
            price: "₹499/month",
            features: ["Weekly pickups", "5 material types", "Priority support"],
        },
        {
            name: "Business",
            price: "₹1999/month",
            features: ["Daily pickups", "Bulk materials", "Dedicated account manager"],
        },
        {
            name: "Industrial",
            price: "₹4999/month",
            features: ["Custom schedule", "Heavy pickup support", "Data & compliance reports"],
        },
    ];

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                EcoWaste Pro Subscription Plans
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.name} className="border-green-100 shadow-md hover:shadow-lg transition">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-green-700">{plan.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold mb-4">{plan.price}</p>
                            <ul className="space-y-2 text-gray-700 mb-4">
                                {plan.features.map((f, i) => (
                                    <li key={i}>✅ {f}</li>
                                ))}
                            </ul>
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                Subscribe
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
