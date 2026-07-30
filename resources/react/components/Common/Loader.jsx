function Loader({ label = "Loading..." }) {
    return (
        <div className="sbb-loader">
            <span className="sbb-loader-spinner" />
            <span className="sbb-loader-label">{label}</span>
        </div>
    );
}

export default Loader;
