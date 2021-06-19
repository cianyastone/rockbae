import { Link, NavLink, useHistory } from 'react-router-dom';
import { Menu, Dropdown, Drawer, Badge } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import { useState, useContext } from "react";
import PreferSummary from "../prefer/PreferSummary";
import CartModal from "../cart/CartModal";
import UserInfo from "../user/UserInfo";
import UserInfoForMobile from "../user/UserInfoForMobile";
import UserModal from "../user/UserModal";
import { StoreContext } from "../../store"
import { setActivityDetail, setPostPage, logoutFromFirebase } from "../../actions";

const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1','sub2'];

export default function NavBar() {
  const { state: { page: { activities }, userSignin : { userInfo } } } = useContext(StoreContext);
  const { dispatch } = useContext(StoreContext);
  const [isOnTouch, setIsOnTouch] = useState(false);
  const handleCloseDrawer = () => setIsOnTouch(false);
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);

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

  const goToProfile = () => {
    history.push("/login?redirect=profile");
  };
  const Logout = () => {
     logoutFromFirebase(dispatch);
     history.push("/");
   };
  
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
    <div className="nav-bar collapse-mobile">
      <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
        <NavLink to="/" className="ant-dropdown-link nav-item" activeClassName="nav-item--active" onClick={e => e.preventDefault()}>
          煞氣ㄉ音樂祭 <DownOutlined/>
        </NavLink>
      </Dropdown>
      <NavLink to="/Prefer" className="nav-item" activeClassName="nav-item--active">
        <PreferSummary />
      </NavLink>
      <NavLink to="/post" className="nav-item" onClick={() => {setPostPage(dispatch, `/post`);}} activeClassName="nav-item--active">
        真摯ㄉ文章
      </NavLink>
      <CartModal className="nav-item"/>
      <UserInfo className="nav-item" style={{marginRight: '20px'}} />
    </div>
    <MenuOutlined onClick={() => setIsOnTouch(!isOnTouch)} isOnTouch={isOnTouch} className="show-mobile nav-position"/>
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
        <Menu mode="inline" >
        {userInfo
              ? 
          <SubMenu key="sub1" 
          title={userInfo
            ? `${userInfo.displayName}'s ㄉ個人頁面`
            : `請登入`
         } 
          openKeys={openKeys} 
          onOpenChange={onOpenChange}>
            
            
            <>
            <Menu.Item key="1">
              <Link to="/profile">
              <p>個人檔案</p>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink to="/createpost" className="activity-name">
                  發布文章
                </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
                <NavLink to="/userorder" className="activity-name">
                  我的訂單
                </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
                <NavLink to="/favoritePost" className="activity-name">
                  收藏ㄉ文章
                </NavLink>
            </Menu.Item>
            <Menu.Item onClick={Logout} key="5">
                登出
            </Menu.Item>
            </>
            
          </SubMenu>
          :
          <Menu.Item key="1">
            <Link to="/login">
            <p>登入</p>
            </Link>
          </Menu.Item>
          }
          <SubMenu key="sub2" title="煞氣ㄉ音樂祭" openKeys={openKeys} onOpenChange={onOpenChange}>
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
    /**/
  );
}

