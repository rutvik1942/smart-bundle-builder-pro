const WIDTH = 860;
const HEIGHT = 320;
const PADDING_LEFT = 46;
const PADDING_BOTTOM = 28;
const PADDING_TOP = 12;

function buildSmoothPath(coords) {
    if (coords.length < 2) return "";

    let d = `M${coords[0][0]},${coords[0][1]}`;

    for (let i = 0; i < coords.length - 1; i++) {
        const [x0, y0] = coords[i];
        const [x1, y1] = coords[i + 1];
        const midX = (x0 + x1) / 2;

        d += ` C${midX},${y0} ${midX},${y1} ${x1},${y1}`;
    }

    return d;
}

function RevenueChart({ points = [], range = "Last 30 Days" }) {
    const chartWidth = WIDTH - PADDING_LEFT;
    const chartHeight = HEIGHT - PADDING_BOTTOM - PADDING_TOP;

    const maxValue = Math.max(...points, 1);
    const niceMax = Math.ceil(maxValue / 1000) * 1000;
    const steps = 4;

    const yLabels = Array.from({ length: steps + 1 }, (_, i) => (niceMax / steps) * i).reverse();

    const coords = points.map((value, i) => {
        const x = PADDING_LEFT + (i / (points.length - 1)) * chartWidth;
        const y = PADDING_TOP + chartHeight - (value / niceMax) * chartHeight;
        return [x, y];
    });

    const linePath = buildSmoothPath(coords);
    const areaPath = `${linePath} L${coords[coords.length - 1][0]},${PADDING_TOP + chartHeight} L${PADDING_LEFT},${PADDING_TOP + chartHeight} Z`;

    const xLabelStep = 3;
    const xLabels = points
        .map((_, i) => i + 1)
        .filter((day) => day === 1 || day % xLabelStep === 0);

    return (
        <div className="sbb-card sbb-revenue-card">

            <header className="sbb-card-header">
                <h3 className="sbb-card-title">Revenue Overview</h3>
                <button type="button" className="sbb-range-pill">
                    {range}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </header>

            <div className="sbb-card-body sbb-revenue-chart-wrap">

                <svg
                    className="sbb-revenue-chart"
                    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                    preserveAspectRatio="none"
                >

                    {yLabels.map((value, i) => {
                        const y = PADDING_TOP + (chartHeight / steps) * i;

                        return (
                            <g key={value}>
                                <line
                                    x1={PADDING_LEFT}
                                    x2={WIDTH}
                                    y1={y}
                                    y2={y}
                                    stroke="var(--sbb-border-light)"
                                    strokeWidth="1"
                                />
                                <text x={0} y={y + 4} className="sbb-chart-axis-label">
                                    ${Math.round(value / 1000)}k
                                </text>
                            </g>
                        );
                    })}

                    <path d={areaPath} fill="url(#sbb-revenue-fill)" stroke="none" />
                    <path d={linePath} fill="none" stroke="var(--sbb-primary)" strokeWidth="2.6" strokeLinecap="round" />

                    {xLabels.map((day) => {
                        const x = PADDING_LEFT + ((day - 1) / (points.length - 1)) * chartWidth;

                        return (
                            <text
                                key={day}
                                x={x}
                                y={HEIGHT - 6}
                                className="sbb-chart-axis-label sbb-chart-axis-label-x"
                            >
                                {day}
                            </text>
                        );
                    })}

                    <defs>
                        <linearGradient id="sbb-revenue-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--sbb-primary)" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="var(--sbb-primary)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                </svg>

            </div>

        </div>
    );
}

export default RevenueChart;
