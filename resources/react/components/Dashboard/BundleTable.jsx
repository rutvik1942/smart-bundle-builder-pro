const ICONS = {
    grooming: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 3v6M6 9a3 3 0 003 3M6 9a3 3 0 01-3 3M6 21V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="17" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M17 9v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
    gym: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="9" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
            <rect x="19" y="9" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
            <path d="M5 12h14M8 8v8M16 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
    coffee: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M17 9h1.5a2.5 2.5 0 010 5H17" stroke="currentColor" strokeWidth="1.6" />
            <path d="M7 3.5c0 1-1 1-1 2s1 1 1 2M11 3.5c0 1-1 1-1 2s1 1 1 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    ),
    laptop: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M2 19h20l-1.5-3h-17L2 19z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
    ),
};

function BundleTable({ bundles = [] }) {
    return (
        <div className="sbb-card sbb-bundle-table-card">

            <header className="sbb-card-header">
                <h3 className="sbb-card-title">Top Performing Bundles</h3>
                <a href="#" className="sbb-link">View All</a>
            </header>

            <div className="sbb-card-body">

                <table className="sbb-table">

                    <thead>
                        <tr>
                            <th>Bundle Name</th>
                            <th className="sbb-table-num">Revenue</th>
                            <th className="sbb-table-num">Conv. Rate</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bundles.map((bundle) => (
                            <tr key={bundle.id}>
                                <td>
                                    <div className="sbb-table-bundle">
                                        <span className="sbb-table-icon">{ICONS[bundle.icon]}</span>
                                        {bundle.name}
                                    </div>
                                </td>
                                <td className="sbb-table-num">{bundle.revenue}</td>
                                <td className="sbb-table-num sbb-table-positive">{bundle.conversion}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default BundleTable;
