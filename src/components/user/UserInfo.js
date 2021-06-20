import { useEffect, useContext, useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getUserImage, logoutFromFirebase } from "../../actions";
import Profile from "./Profile";
import UserModal from "./UserModal";

import { StoreContext } from "../../store"



export default function UserInfo() {
   const { state: { userSignin: { userInfo } },dispatch } = useContext(StoreContext);
   const history = useHistory();
   const Logout = () => {
      logoutFromFirebase(dispatch);
      history.push("/");
    };
   const [isModalVisible, setIsModalVisible] = useState(false);
   const toggleModal = () => setIsModalVisible(!isModalVisible);
   const [isModalVisible2, setIsModalVisible2] = useState(false);
   const toggleModal2 = () => setIsModalVisible2(!isModalVisible2);
   console.log(getUserImage(userInfo.email));

   const menu = (
      <Menu>
         <Menu.Item>
            <nav onClick={toggleModal2}>
               個人檔案
               <Profile isModalVisible={isModalVisible2} toggleModal={toggleModal2}/>
            </nav>
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
         <Menu.Item>
            <NavLink to="/favoritePost">
               收藏ㄉ文章
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
               <nav>
                  <Avatar>
                  {userInfo.displayName}
                  </Avatar>
               </nav>
            </Dropdown>
         : <>
         <Avatar onClick={toggleModal} icon={<UserOutlined />} />
         <UserModal isModalVisible={isModalVisible} toggleModal={toggleModal}/>
         </>
      }
      </>
   );
}
