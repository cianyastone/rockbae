import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Drawer } from 'antd';
import { useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import activity from '../json/activity.json';
import { Link } from 'react-router-dom';
import PreferSummary from "./PreferSummary";
import CartModal from "./CartModal";

const { SubMenu } = Menu;

const rootSubmenuKeys = ['sub1'];

const menu = (
  <Menu>
    {[...Array(activity.length).keys()].map((x) => (
      <Menu.Item value={x}>
        <Link to={`/activity/${activity[x].id}`}>
          <p className="activity-name">
            {activity[x].name}
          </p>
        </Link>
      </Menu.Item>
    ))}
  </Menu>
);

export default function NavBar() {
  const [isOnTouch, setIsOnTouch] = useState(false);
  const handleCloseDrawer = () => setIsOnTouch(false);
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <>
    <Link onClick={() => setIsOnTouch(!isOnTouch)} isOnTouch={isOnTouch} className="show-mobile">
      <img src="https://i.pinimg.com/originals/35/73/f4/3573f498e9a1aabd2408b997fd2dc368.png" width="30px"></img>
    </Link>
    <div className="nav-bar collapse-mobile">
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
    <Drawer
      closable={false}
      onClose={handleCloseDrawer}
      visible={isOnTouch}
      width={400}
      zIndex={99}
      >
        <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
          <SubMenu key="sub1" title="煞氣ㄉ音樂祭">
            {[...Array(activity.length).keys()].map((x) => (
            <Menu.Item value={x}>
                <Link to={`/activity/${activity[x].id}`}>
                  <p className="activity-name">
                    {activity[x].name}
                  </p>
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
          <Menu.Item key="link">
            <NavLink to="/Prefer" activeClassName="nav-item--active">
              想去ㄉ活動
            </NavLink>
          </Menu.Item>
          <Menu.Item key="link">
            <NavLink to="/Prefer" activeClassName="nav-item--active">
              婐ㄉ購物車
            </NavLink>
          </Menu.Item>
        </Menu>
    </Drawer>
    </>
  );
}

