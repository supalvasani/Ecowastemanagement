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