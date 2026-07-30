const ICONS = {
    sale: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M7 7h10l1 12H6L7 7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 7a3 3 0 016 0" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    ),
    update: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M4 20l1-4.6L15.6 5 19 8.4 8.6 19 4 20z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
    ),
    campaign: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M3 11v2a2 2 0 002 2h1l4 4V5L6 9H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M16 8a4 4 0 010 8M19 5a8 8 0 010 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
};

function ActivityTimeline({ activity = [] }) {
    return (
        <div className="sbb-card sbb-activity-card">

            <header className="sbb-card-header">
                <h3 className="sbb-card-title">Recent Activity</h3>
            </header>

            <div className="sbb-card-body">

                <ul className="sbb-timeline">
                    {activity.map((item) => (
                        <li key={item.id} className="sbb-timeline-item">

                            <span className={`sbb-timeline-dot sbb-timeline-dot-${item.type}`}>
                                {ICONS[item.type]}
                            </span>

                            <div className="sbb-timeline-content">
                                <div className="sbb-timeline-heading">
                                    <span className="sbb-timeline-title">{item.title}</span>
                                    <span className="sbb-timeline-time">{item.time}</span>
                                </div>
                                <p className="sbb-timeline-description">{item.description}</p>
                            </div>

                        </li>
                    ))}
                </ul>

            </div>

        </div>
    );
}

export default ActivityTimeline;
