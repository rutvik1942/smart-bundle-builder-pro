import SearchBar from "./SearchBar";
import Notifications from "./Notifications";
import ProfileMenu from "./ProfileMenu";

function Header() {
    return (
        <header className="sbb-header">

            <SearchBar />

            <div className="sbb-header-actions">
                <Notifications count={1} />
                <ProfileMenu />
            </div>

        </header>
    );
}

export default Header;
