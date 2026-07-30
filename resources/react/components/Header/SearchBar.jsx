function SearchBar() {
    return (
        <div className="sbb-search">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder="Search bundles, metrics..." />
        </div>
    );
}

export default SearchBar;
