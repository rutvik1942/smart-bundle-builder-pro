import { useState } from "react";

function SparkleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M11 2l1.8 5L18 8.8l-5.2 1.8L11 15.6l-1.8-5L4 8.8l5.2-1.8L11 2z"
                fill="currentColor"
            />
            <path
                d="M18.5 14l1 2.7 2.7 1-2.7 1-1 2.7-1-2.7-2.7-1 2.7-1 1-2.7z"
                fill="currentColor"
            />
        </svg>
    );
}

function InsightCard({ insight, onDismiss, onAction }) {
    return (
        <div className="sbb-insight-card">

            <div className="sbb-insight-top">
                <span className={`sbb-pill sbb-pill-${insight.tagVariant}`}>{insight.tag}</span>
                <button
                    type="button"
                    className="sbb-insight-close"
                    aria-label="Dismiss insight"
                    onClick={() => onDismiss(insight.id)}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            <p className="sbb-insight-body">
                {insight.body.map((chunk, i) =>
                    chunk.strong ? <strong key={i}>{chunk.text}</strong> : <span key={i}>{chunk.text}</span>
                )}
            </p>

            <button
                type="button"
                className="sbb-btn sbb-btn-primary sbb-btn-block"
                onClick={() => onAction?.(insight)}
            >
                {insight.action}
            </button>

        </div>
    );
}

function AIInsights({ insights = [], onNavigate }) {
    const [dismissed, setDismissed] = useState([]);

    const visible = insights.filter((insight) => !dismissed.includes(insight.id));

    const handleAction = (insight) => {
        if (insight.action === "Create Bundle") {
            onNavigate?.("create-bundle");
        }
    };

    return (
        <div className="sbb-card sbb-ai-insights-card">

            <header className="sbb-card-header sbb-ai-insights-header">
                <span className="sbb-ai-insights-icon"><SparkleIcon /></span>
                <h3 className="sbb-card-title">AI Insights</h3>
            </header>

            <div className="sbb-card-body sbb-ai-insights-body">
                {visible.length === 0 && (
                    <p className="sbb-empty-description">You're all caught up — new insights will appear here.</p>
                )}

                {visible.map((insight) => (
                    <InsightCard
                        key={insight.id}
                        insight={insight}
                        onDismiss={(id) => setDismissed((prev) => [...prev, id])}
                        onAction={handleAction}
                    />
                ))}
            </div>

        </div>
    );
}

export default AIInsights;
