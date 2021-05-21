import { useEffect, useContext } from "react";
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { StoreContext } from "../../store"

export default function UserInfoForMobile(props) {

   const { state: { userSignin : { userInfo } } } = useContext(StoreContext);
   const history = useHistory();

   const goToProfile = () => {
      history.push("/login?redirect=profile");
   };

   useEffect(() => {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
   }, [userInfo]);

   return (
      <>
         <nav onClick={goToProfile} className="header-cart-summary" >
            <p className="cart-summary-text">
               {userInfo
                  ? `${userInfo.displayName}'s ㄉ個人頁面`
                  : `請登入`
               }
            </p>
         </nav>
      </>
   );
}
