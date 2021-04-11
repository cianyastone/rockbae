import { NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import ActivityItem from "./ActivityItem";

export default function NavBar() {
    const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          </Menu.Item>
          <Menu.Item icon={<DownOutlined />} >
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          </Menu.Item>
          <Menu.Item >
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          </Menu.Item>
        </Menu>
    );
    const { SubMenu } = Menu;
    return (
        <div className="nav-bar">
            <Dropdown overlay={menu}>
                    <NavLink to="/"className="ant-dropdown-link nav-item" activeClassName="nav-item--active" onClick={e => e.preventDefault()}>
                    煞氣ㄉ音樂祭
                    </NavLink>
            </Dropdown>
            <NavLink to="/" className="nav-item" activeClassName="nav-item--active">
                想去ㄉ活動
            </NavLink>
            <NavLink to="/" className="nav-item" activeClassName="nav-item--active">
                婐ㄉ購物車
            </NavLink>
        </div>
    );
}

