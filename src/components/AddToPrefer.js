import { useContext } from "react";
import { Button, notification } from "antd"
import { Link } from 'react-router-dom';
import { StoreContext } from "../store"
import { PREFER_ADD_ITEM } from "../utils/constants"
import { HeartTwoTone } from '@ant-design/icons';

export default function AddToPrefer({activity}){
    const { dispatch } = useContext(StoreContext);

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
        dispatch({
          type: PREFER_ADD_ITEM,
          payload: {
            id: activity.id,
            name: activity.name,
            image: activity.image,
          },
        });
    };
    return (
        <>
        <Link className="btn-toprefer" onClick={addToPrefer}>
            <HeartTwoTone />
        </Link>
        {/* <Button type="link" className="btn-toprefer" onClick={addToPrefer}>
            <HeartTwoTone style={{color:'#eb2f96'}} onClick={setColor('#eb2f96')} />
        </Button> */}
        </>
    );
}