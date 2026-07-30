import { useDashboard } from "../hooks/useDashboard";

import KPICard from "../components/Dashboard/KPICard";
import RevenueChart from "../components/Dashboard/RevenueChart";
import AIInsights from "../components/Dashboard/AIInsights";
import BundleTable from "../components/Dashboard/BundleTable";
import ActivityTimeline from "../components/Dashboard/ActivityTimeline";
import Loader from "../components/Common/Loader";
import Button from "../components/Common/Button";

function PlusIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    );
}

function Dashboard({ onNavigate }) {
    const { data, loading } = useDashboard();

    if (loading || !data) {
        return <Loader label="Loading dashboard..." />;
    }

    return (
        <>

            <div className="sbb-page-header">

                <div>
                    <h1 className="page-title">Overview</h1>
                    <p className="page-description">Here's what's happening with your bundles today.</p>
                </div>

                <div className="sbb-page-header-actions">
                    <Button variant="secondary">Export Report</Button>
                    <Button
                        variant="primary"
                        icon={<PlusIcon />}
                        onClick={() => onNavigate?.("create-bundle")}
                    >
                        New Bundle
                    </Button>
                </div>

            </div>

            <div className="sbb-kpi-grid">
                {data.kpis.map((kpi) => (
                    <KPICard key={kpi.key} {...kpi} />
                ))}
            </div>

            <div className="sbb-grid-main">
                <RevenueChart points={data.revenue.points} range={data.revenue.range} />
                <AIInsights insights={data.insights} onNavigate={onNavigate} />
            </div>

            <div className="sbb-grid-secondary">
                <BundleTable bundles={data.topBundles} />
                <ActivityTimeline activity={data.activity} />
            </div>

        </>
    );
}

export default Dashboard;
