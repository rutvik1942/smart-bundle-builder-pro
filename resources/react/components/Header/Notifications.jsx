function Notifications({ count = 0 }) {
    return (
        <button type="button" className="sbb-icon-btn" aria-label="Notifications">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path
                    d="M6 9a6 6 0 0112 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {count > 0 && <span className="sbb-icon-badge" />}
        </button>
    );
}

export default Notifications;
