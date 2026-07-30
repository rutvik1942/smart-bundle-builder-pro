function Card({ title, action, className = "", children }) {
    return (
        <section className={`sbb-card ${className}`.trim()}>

            {(title || action) && (
                <header className="sbb-card-header">
                    {title && <h3 className="sbb-card-title">{title}</h3>}
                    {action}
                </header>
            )}

            <div className="sbb-card-body">
                {children}
            </div>

        </section>
    );
}

export default Card;
