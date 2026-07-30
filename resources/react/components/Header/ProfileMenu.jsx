function ProfileMenu({ storeIcon = true }) {
    return (
        <div className="sbb-header-actions-group">

            {storeIcon && (
                <button type="button" className="sbb-icon-btn" aria-label="Store">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M4 9l1-5h14l1 5M4 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0M5 9v10h14V9"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}

            <button type="button" className="sbb-icon-btn" aria-label="Account">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M5 20c1.4-3.4 4-5 7-5s5.6 1.6 7 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
            </button>

        </div>
    );
}

export default ProfileMenu;
