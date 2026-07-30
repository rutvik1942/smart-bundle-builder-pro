import { useEffect, useMemo, useState } from "react";

/**
 * Provides the product catalog used by the Bundle Builder, plus
 * bundle-type metadata.
 *
 * Seeded with mock WooCommerce-style products for now. Once
 * `app/API/ProductController.php` exposes a real endpoint, swap the
 * mock block below for a call through `services/api.js`.
 */

const MOCK_PRODUCTS = [
    { id: 101, name: "Leather Boots", sku: "SKU-1041", price: 89.0, category: "Footwear", initials: "LB", color: "#4f46e5" },
    { id: 102, name: "Shoe Care Kit", sku: "SKU-1042", price: 18.5, category: "Accessories", initials: "SK", color: "#0ea5e9" },
    { id: 103, name: "Wool Socks (3-Pack)", sku: "SKU-1043", price: 14.0, category: "Apparel", initials: "WS", color: "#16a34a" },
    { id: 104, name: "Grooming Trimmer", sku: "SKU-2011", price: 44.0, category: "Grooming", initials: "GT", color: "#f59e0b" },
    { id: 105, name: "Beard Oil", sku: "SKU-2012", price: 16.0, category: "Grooming", initials: "BO", color: "#ef4444" },
    { id: 106, name: "Travel Dopp Kit", sku: "SKU-2013", price: 29.0, category: "Accessories", initials: "TD", color: "#8b5cf6" },
    { id: 107, name: "Resistance Bands Set", sku: "SKU-3001", price: 22.0, category: "Fitness", initials: "RB", color: "#0d9488" },
    { id: 108, name: "Adjustable Dumbbells", sku: "SKU-3002", price: 129.0, category: "Fitness", initials: "AD", color: "#dc2626" },
    { id: 109, name: "Yoga Mat", sku: "SKU-3003", price: 32.0, category: "Fitness", initials: "YM", color: "#7c3aed" },
    { id: 110, name: "Pour-Over Coffee Set", sku: "SKU-4001", price: 38.0, category: "Kitchen", initials: "PC", color: "#a16207" },
    { id: 111, name: "Coffee Beans (1kg)", sku: "SKU-4002", price: 21.0, category: "Kitchen", initials: "CB", color: "#78350f" },
    { id: 112, name: "Wireless Mouse", sku: "SKU-5001", price: 27.0, category: "Electronics", initials: "WM", color: "#2563eb" },
];

export const BUNDLE_TYPES = [
    {
        key: "fixed",
        label: "Fixed Bundle",
        description: "A curated set of products sold together at a fixed discounted price.",
    },
    {
        key: "mix-match",
        label: "Mix & Match",
        description: "Customers pick any items from a group, priced as they build it.",
    },
    {
        key: "volume",
        label: "Volume Discount",
        description: "Discount tiers unlock automatically as customers buy more.",
    },
];

export function useBundles() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        let isMounted = true;

        const timer = setTimeout(() => {
            if (isMounted) {
                setProducts(MOCK_PRODUCTS);
                setLoading(false);
            }
        }, 120);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, []);

    const filteredProducts = useMemo(() => {
        if (!query.trim()) return products;

        const term = query.trim().toLowerCase();

        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(term) ||
                product.sku.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term)
        );
    }, [products, query]);

    return { products: filteredProducts, allProducts: products, loading, query, setQuery };
}
