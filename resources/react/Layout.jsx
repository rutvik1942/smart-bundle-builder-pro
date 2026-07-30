import { useState } from "react";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard";
import CreateBundle from "./pages/CreateBundle";

/**
 * Very small client-side "router". Anything not wired up yet
 * (Bundles, AI Recommendations, Analytics, Reports, Settings, Help)
 * simply falls back to the Dashboard for now.
 */
const PAGES = {
    "dashboard": Dashboard,
    "create-bundle": CreateBundle,
};

function Layout() {
    const [activePage, setActivePage] = useState("dashboard");

    const ActivePage = PAGES[activePage] || Dashboard;

    return (
        <div className="sbb-layout">

            <Sidebar active={activePage} onNavigate={setActivePage} />

            <div className="sbb-main">

                <Header />

                <main className="sbb-content">

                    <ActivePage onNavigate={setActivePage} />

                </main>

            </div>

        </div>
    );
}

export default Layout;
