import { useEffect, useState } from "react";

/**
 * Provides all data needed by the Dashboard page.
 *
 * Currently seeded with representative mock data so the UI can be
 * built and demoed independently of the REST API. Once
 * `app/API/DashboardController.php` is implemented, swap the mock
 * block below for a call through `services/api.js`.
 */

const MOCK_DATA = {
    kpis: [
        {
            key: "revenue",
            label: "Total Revenue",
            value: "$124.5k",
            trend: "+12%",
            trendDirection: "up",
            icon: "revenue",
            spark: [10, 18, 15, 22, 20, 28, 26, 34, 30, 38],
        },
        {
            key: "sales",
            label: "Bundle Sales",
            value: "1,432",
            trend: "+8.4%",
            trendDirection: "up",
            icon: "sales",
            spark: [14, 16, 15, 18, 22, 20, 24, 26, 25, 30],
        },
        {
            key: "aov",
            label: "Average Order Value (AOV)",
            value: "$84.20",
            trend: "+5.2%",
            trendDirection: "up",
            icon: "aov",
            spark: [20, 19, 21, 20, 22, 21, 23, 22, 24, 23],
        },
        {
            key: "conversion",
            label: "Conversion Rate",
            value: "3.8%",
            trend: "+0.4%",
            trendDirection: "up",
            icon: "conversion",
            spark: [18, 17, 18, 17, 16, 17, 16, 15, 16, 15],
        },
    ],

    revenue: {
        range: "Last 30 Days",
        points: [
            3200, 3600, 3400, 3900, 3550, 4100, 4650,
            4300, 5000, 5600, 5300, 5700, 6100, 5850,
            6300, 6600, 6250, 5900, 6400, 6800, 7050,
            6700, 6400, 6100, 6500, 6900, 7300, 7100, 6850, 7400,
        ],
    },

    insights: [
        {
            id: 1,
            tag: "High Impact",
            tagVariant: "impact",
            body: [
                { text: "Increase AOV by " },
                { text: "12%", strong: true },
                { text: " by bundling " },
                { text: "'Leather Boots'", strong: true },
                { text: " with " },
                { text: "'Shoe Care Kit'", strong: true },
                { text: "." },
            ],
            action: "Create Bundle",
        },
        {
            id: 2,
            tag: "Trending",
            tagVariant: "trending",
            body: [
                { text: "'Summer Collection' bundle views are up " },
                { text: "45%", strong: true },
                { text: " this week. Consider a targeted email campaign." },
            ],
            action: "View Details",
        },
    ],

    topBundles: [
        { id: 1, name: "The Ultimate Grooming Kit", icon: "grooming", revenue: "$12,450", conversion: "5.2%" },
        { id: 2, name: "Home Gym Starter Pack", icon: "gym", revenue: "$9,820", conversion: "4.8%" },
        { id: 3, name: "Barista Essentials", icon: "coffee", revenue: "$7,105", conversion: "3.9%" },
        { id: 4, name: "WFH Productivity Setup", icon: "laptop", revenue: "$5,430", conversion: "2.1%" },
    ],

    activity: [
        {
            id: 1,
            type: "sale",
            title: "New Sale",
            time: "2m ago",
            description: "Order #4892 - The Ultimate Grooming Kit",
        },
        {
            id: 2,
            type: "update",
            title: "Bundle Updated",
            time: "1h ago",
            description: "'Home Gym Starter Pack' pricing updated.",
        },
        {
            id: 3,
            type: "campaign",
            title: "Campaign Started",
            time: "3h ago",
            description: "Summer promo email blast sent.",
        },
    ],
};

export function useDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const timer = setTimeout(() => {
            if (isMounted) {
                setData(MOCK_DATA);
                setLoading(false);
            }
        }, 150);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, []);

    return { data, loading };
}
