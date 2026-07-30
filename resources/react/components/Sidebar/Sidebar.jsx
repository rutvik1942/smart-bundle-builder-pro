import SidebarItem from "./SidebarItem";
import { primaryMenu, reportsMenu, footerMenu } from "./SidebarMenu";

function Sidebar({ active = "dashboard", onNavigate }) {
    return (
        <aside className="sbb-sidebar">

            <div className="sbb-brand">
                <span className="sbb-brand-mark">B</span>
                <div className="sbb-brand-text">
                    <span className="sbb-brand-title">Bundle&nbsp;Builder&nbsp;Pro</span>
                    <span className="sbb-brand-plan">Enterprise Plan</span>
                </div>
            </div>

            <nav className="sbb-nav">

                <ul className="sbb-nav-group">
                    {primaryMenu.map((item) => (
                        <SidebarItem
                            key={item.key}
                            item={item}
                            active={active === item.key}
                            onClick={onNavigate}
                        />
                    ))}
                </ul>

                <p className="sbb-nav-section-title">Analytics &amp; Reports</p>

                <ul className="sbb-nav-group">
                    {reportsMenu.map((item) => (
                        <SidebarItem
                            key={item.key}
                            item={item}
                            active={active === item.key}
                            onClick={onNavigate}
                        />
                    ))}
                </ul>

            </nav>

            <ul className="sbb-nav-group sbb-nav-footer">
                {footerMenu.map((item) => (
                    <SidebarItem
                        key={item.key}
                        item={item}
                        active={active === item.key}
                        onClick={onNavigate}
                    />
                ))}
            </ul>

        </aside>
    );
}

export default Sidebar;
