function EmptyState({ title = "Nothing here yet", description = "", action = null }) {
    return (
        <div className="sbb-empty-state">
            <p className="sbb-empty-title">{title}</p>
            {description && <p className="sbb-empty-description">{description}</p>}
            {action}
        </div>
    );
}

export default EmptyState;
