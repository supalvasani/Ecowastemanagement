import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state to show fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("Error caught by ErrorBoundary:", error, info);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
                    <h1 className="text-3xl font-bold text-red-600 mb-2">
                        Something went wrong 😢
                    </h1>
                    <p className="text-gray-600 mb-6">
                        An unexpected error occurred while loading this page.
                    </p>
                    <div className="space-x-3">
                        <button
                            onClick={this.handleReload}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Reload
                        </button>
                        <a
                            href="/"
                            className="border border-green-600 text-green-700 px-4 py-2 rounded hover:bg-green-50"
                        >
                            Go Home
                        </a>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
