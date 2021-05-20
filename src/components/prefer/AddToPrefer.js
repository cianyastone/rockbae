import { useContext, useEffect } from "react";
import { notification } from "antd"
import { Link } from 'react-router-dom';
import { StoreContext } from "../../store"
import { HeartTwoTone, HeartFilled } from '@ant-design/icons';
import Cookie from "js-cookie";
import {addPreferItem} from "../../actions"

export default function AddToPrefer({activity}){
    const { state: { preferItems }, dispatch } = useContext(StoreContext);

    var count = 1; 
    function setColor(color) {
        if (count === 0) { 
         color = "#FFFFFF" 
         count = 1;   
        } 
        else { 
         color = "#7FFF00" 
         count = 0; 
        } 
    } 
    const openNotification = () => {
        notification.open({
        message: '嘿 朋朋！',
        description:
            ` ${activity.name}  已加入想去ㄉ活動`,
            icon: <HeartTwoTone style={{ color: '#000' }} />,
        onClick: () => {
            console.log('Notification Clicked!');
        },
        placement: 'bottomRight'
        });
    };

    const addToPrefer = () => {
        openNotification();
        addPreferItem(dispatch, activity);
        // if (count === 0) {  
        //     count = 1;  
        //    } 
        //    else { 
        //     color = "#7FFF00" 
        //     count = 0; 
        // };
    };

    useEffect(()=>{
        Cookie.set("preferItems", JSON.stringify(preferItems));
     }, [preferItems])

    return (
        <>
        <Link className="btn-toprefer" onClick={addToPrefer}>
            <HeartTwoTone twoToneColor="#eb2f96" />
        </Link>
        {/* <Button type="link" className="btn-toprefer" onClick={addToPrefer}>
            <HeartTwoTone style={{color:'#eb2f96'}} onClick={setColor('#eb2f96')} />
        </Button> */}
        </>
    );
}