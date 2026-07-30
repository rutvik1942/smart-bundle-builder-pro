function Button({
    children,
    variant = "secondary",
    icon = null,
    onClick,
    type = "button",
    ...rest
}) {
    return (
        <button
            type={type}
            className={`sbb-btn sbb-btn-${variant}`}
            onClick={onClick}
            {...rest}
        >
            {icon && <span className="sbb-btn-icon">{icon}</span>}
            {children}
        </button>
    );
}

export default Button;
