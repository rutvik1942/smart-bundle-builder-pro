/**
 * Sidebar navigation configuration.
 *
 * `key` is used both as the React key and to match the current
 * route so the correct item can be highlighted as active.
 */

export const primaryMenu = [
    { key: "dashboard", label: "Dashboard", icon: "dashboard" },
    { key: "bundles", label: "Bundles", icon: "bundles" },
    { key: "create-bundle", label: "Create Bundle", icon: "create" },
    { key: "ai-recommendations", label: "AI Recommendations", icon: "sparkles" },
];

export const reportsMenu = [
    { key: "analytics", label: "Analytics", icon: "analytics" },
    { key: "reports", label: "Reports", icon: "reports" },
];

export const footerMenu = [
    { key: "settings", label: "Settings", icon: "settings" },
    { key: "help", label: "Help", icon: "help" },
];
