import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Drawer, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState, useContext } from "react";
import PreferSummary from "../prefer/PreferSummary";
import CartModal from "../cart/CartModal";
import UserInfo from "../user/UserInfo";
import UserInfoForMobile from "../user/UserInfoForMobile";
import { StoreContext } from "../../store"
import { setActivityDetail } from "../../actions";

const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1'];

export default function NavBar() {
  const { state: { page: { activities } } } = useContext(StoreContext);
  const { dispatch } = useContext(StoreContext);
  const [isOnTouch, setIsOnTouch] = useState(false);
  const handleCloseDrawer = () => setIsOnTouch(false);
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const menu = (
    <Menu>
      {[...Array(activities.length).keys()].map((x) => (
        <Menu.Item value={x}>
          <Link to={`/activity/${activities[x].id}`}
              onClick={() => {setActivityDetail(dispatch, activities[x].id, 0, 1);}}
          >
            <p className="activity-name">
              {activities[x].name}
            </p>
          </Link>
        </Menu.Item>
      ))}
      <Menu.Item>
        <Link to='/'>
            <p className="activity-name">
              更多活動
            </p>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const { state: { cart: { cartItems } } } = useContext(StoreContext);

    let count = (cartItems.length > 0) ?
        cartItems.reduce((sum,item) => sum+item.qty, 0)
        : 0;

  return (
    <>
    <Link onClick={() => setIsOnTouch(!isOnTouch)} isOnTouch={isOnTouch} className="show-mobile nav-position">
      <img src="https://i.pinimg.com/originals/35/73/f4/3573f498e9a1aabd2408b997fd2dc368.png" width="30px"></img>
    </Link>
    <div className="nav-bar collapse-mobile">
      <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
        <NavLink to="/" className="ant-dropdown-link nav-item" activeClassName="nav-item--active" onClick={e => e.preventDefault()}>
          煞氣ㄉ音樂祭 <DownOutlined/>
        </NavLink>
      </Dropdown>
      <NavLink to="/Prefer" activeClassName="nav-item--active">
        <PreferSummary preference={'想去ㄉ活動'} />
      </NavLink>
      <CartModal/>
      <NavLink to="/post" className="nav-item" activeClassName="nav-item--active">
        文章
      </NavLink>
      <UserInfo style={{marginRight: '20px'}} />
    </div>
    <Drawer
      closable={false}
      onClose={handleCloseDrawer}
      visible={isOnTouch}
      width={300}
      zIndex={100}
      >
        <Link to="/Home">
          <img className="nav-slogan" width="50%" src="https://i.pinimg.com/564x/09/79/8f/09798f85e707c8e84d3e8460318d4998.jpg" alt="description"/>
        </Link>
        <UserInfoForMobile />
        <Menu mode="inline" >
          <SubMenu key="sub1" title="煞氣ㄉ音樂祭" openKeys={openKeys} onOpenChange={onOpenChange}>
            {[...Array(activities.length).keys()].map((x) => (
            <Menu.Item value={x}>
                <Link to={`/activity/${activities[x].id}`}>
                  <p className="activity-name">
                    {activities[x].name}
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
            <NavLink to="/Cart" activeClassName="nav-item--active">
            <Badge count={count} size={"small"} style={{ color: 'white', backgroundColor: '#6366F2' }}>
              婐ㄉ購物車
            </Badge>
            </NavLink>
          </Menu.Item>
        </Menu>
    </Drawer>
    </>
  );
}

