import React from 'react';
import { Recycle, Target, Eye, Users, Award, Heart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-green-50 to-white py-20">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        About <span className="text-green-600">EcoWaste Pro</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Pioneering India's transition to a circular economy through innovative, transparent, and rewarding waste management solutions.
                    </p>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Target className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            To revolutionize waste management in India by creating a transparent ecosystem where households earn from their recyclables, businesses receive compliant disposal solutions, and the environment benefits from reduced landfill waste.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We believe every piece of waste has value. Our technology-driven platform connects waste generators with certified processors, ensuring maximum resource recovery and minimal environmental impact.
                        </p>
                    </div>
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop"
                            alt="Recycling facility"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-xl text-gray-600">The principles that guide everything we do</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="border-2 hover:shadow-xl transition-shadow">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Recycle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Sustainability</h3>
                                <p className="text-gray-600 leading-relaxed">Environmental responsibility at the core of our operations, driving us to find innovative solutions for a cleaner planet.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:shadow-xl transition-shadow">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Eye className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Transparency</h3>
                                <p className="text-gray-600 leading-relaxed">Clear communication, honest pricing, and complete visibility into every transaction and process.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:shadow-xl transition-shadow">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Community</h3>
                                <p className="text-gray-600 leading-relaxed">Empowering individuals and businesses to make a positive environmental and social impact together.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Impact Stats */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
                        <p className="text-xl text-gray-600">Making a real difference, one pickup at a time</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-5xl font-bold text-green-600 mb-2">10,000+</div>
                            <div className="text-gray-600 font-medium">Happy Customers</div>
                        </div>
                        <div className="p-6">
                            <div className="text-5xl font-bold text-green-600 mb-2">500+</div>
                            <div className="text-gray-600 font-medium">Business Partners</div>
                        </div>
                        <div className="p-6">
                            <div className="text-5xl font-bold text-green-600 mb-2">5Cr+</div>
                            <div className="text-gray-600 font-medium">Paid to Suppliers</div>
                        </div>
                        <div className="p-6">
                            <div className="text-5xl font-bold text-green-600 mb-2">50K+</div>
                            <div className="text-gray-600 font-medium">Tons Recycled</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-green-600 to-green-500 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Why Choose EcoWaste Pro?</h2>
                        <p className="text-xl text-green-50">We're more than just a waste management company</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <Award className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">GPCB Certified</h3>
                            <p className="text-green-50">Fully compliant with all environmental regulations</p>
                        </div>
                        <div className="text-center">
                            <Heart className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Customer First</h3>
                            <p className="text-green-50">Dedicated support team available 24/7</p>
                        </div>
                        <div className="text-center">
                            <Target className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Technology Driven</h3>
                            <p className="text-green-50">Advanced tracking and transparent processes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}