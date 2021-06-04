import { useEffect, useContext } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logoutFromFirebase } from "../../actions";

import { StoreContext } from "../../store"



export default function UserInfo(props) {
   const { state: { userSignin: { userInfo } },dispatch } = useContext(StoreContext);
   const history = useHistory();
   const goToProfile = () => {
      history.push("/login?redirect=profile");
   };
   const Logout = () => {
      logoutFromFirebase(dispatch);
      history.push("/");
    };

   const menu = (
      <Menu>
         <Menu.Item>
            <NavLink to="/profile">
               個人檔案
            </NavLink>
         </Menu.Item>
         <Menu.Item>
            <NavLink to="/createpost">
               發布文章
            </NavLink>
         </Menu.Item>
         <Menu.Item>
            <NavLink to="/userorder">
               我的訂單
            </NavLink>
         </Menu.Item>
         <Menu.Item onClick={Logout}>
            登出
         </Menu.Item>
      </Menu> 
   );

   useEffect(() => {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
   }, [userInfo]);

   return (
      <>
      {userInfo
         ? <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
               <nav style={{ ...props.style }} className="header-cart-summary" >
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <p className="cart-summary-text">
                     {userInfo
                        ? `${userInfo.displayName}'s`
                        : `請登入`
                     }
                  </p>
               </nav>
            </Dropdown>
         : <Avatar onClick={goToProfile} icon={<UserOutlined />} />
      }
      </>
   );
}
