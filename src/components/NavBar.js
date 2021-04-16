import { NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import activity from '../json/activity.json';
import { Link } from 'react-router-dom';
import PreferSummary from "./PreferSummary";
import CartModal from "./CartModal";

const menu = (
  <Menu>
    <Menu.Item>
      <Link to={`/activity/${activity[0].id}`}>
        <p className="activity-name">
          {activity[0].name}
        </p>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={`/activity/${activity[1].id}`}>
        <p className="activity-name">
          {activity[1].name}
        </p>
      </Link>
    </Menu.Item>
    <Menu.Item >
      <Link to={`/activity/${activity[2].id}`}>
          <p className="activity-name">
            {activity[2].name}
          </p>
      </Link>
    </Menu.Item>
    <Menu.Item >
      <Link to={`/activity/${activity[3].id}`}>
          <p className="activity-name">
            {activity[3].name}
          </p>
      </Link>
    </Menu.Item>
    <Menu.Item >
      <Link to={`/activity/${activity[4].id}`}>
          <p className="activity-name">
            {activity[4].name}
          </p>
      </Link>
    </Menu.Item>
    <Menu.Item >
      <Link to={`/Home`}>
          <p className="activity-name">
            more
          </p>
      </Link>
    </Menu.Item>
  </Menu>
);

export default function NavBar() {
    return (
      <>
      <div className="nav-bar">
        <Dropdown overlay={menu} placement="bottomCenter">
          <NavLink to="/" className="ant-dropdown-link nav-item" activeClassName="nav-item--active" onClick={e => e.preventDefault()}>
            煞氣ㄉ音樂祭 <DownOutlined/>
          </NavLink>
        </Dropdown>
        <NavLink to="/Prefer" activeClassName="nav-item--active">
          <PreferSummary preference={'想去ㄉ活動'} />
        </NavLink>
        <CartModal/>
      </div>
      </>
    );
}

