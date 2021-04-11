import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className="nav-bar">
            <NavLink to="/" className="nav-item" activeClassName="nav-item--active">
                煞氣ㄉ音樂祭
            </NavLink>
            <NavLink to="/" className="nav-item" activeClassName="nav-item--active">
                想去ㄉ活動
            </NavLink>
            <NavLink to="/" className="nav-item" activeClassName="nav-item--active">
                婐ㄉ購物車
            </NavLink>
        </div>
    );
}