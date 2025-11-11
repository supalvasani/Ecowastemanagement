import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function createPageUrl(slug) {
    if (slug.toLowerCase() === 'landing') return `/`
    if (slug.toLowerCase() === 'login') return `/login`
    return `/${slug.toLowerCase()}`
}

export const bookingUtils = {
    saveBooking: (booking) => {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    },

    getBookings: () => {
        return JSON.parse(localStorage.getItem('bookings') || '[]');
    },

    getUserBookings: (userName) => {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        return bookings.filter(booking => booking.userName === userName);
    }
};

export const getRequestsByUserName = (userName) => {
    const allRequests = JSON.parse(localStorage.getItem('ecowaste_requests') || '[]');
    if (!userName) return []; // Guard against null user

    // Filter by name (Household) or contactPerson (Business)
    return allRequests.filter(req =>
        (req.type === 'Household' && req.name === userName) ||
        (req.type === 'Business' && req.contactPerson === userName)
    );
}