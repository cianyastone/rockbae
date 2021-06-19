import { useContext, useEffect } from "react";
import { notification } from "antd"
import { Link } from 'react-router-dom';
import { StoreContext } from "../../store"
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Cookie from "js-cookie";
import { addPreferItem, removeFromPrefer } from "../../actions"

export default function AddToPrefer({activity}){
    const { state: { preferItems }, dispatch } = useContext(StoreContext);
    var InPrefer = preferItems.map(function(item) {
        return item.name;
    }).includes(activity.name);

    const openNotification = () => {
        notification.open({
        message: '嘿 朋朋！',
        description:
            ` ${activity.name}  已加入想去ㄉ活動`,
            icon: <HeartOutlined style={{ color: '#000' }} />,
        onClick: () => {
            console.log('Notification Clicked!');
        },
        placement: 'bottomRight'
        });
    };
    const openNotification2 = () => {
        notification.open({
        message: '嘿 朋朋！',
        description:
            ` ${activity.name}  已從想去ㄉ活動中移除`,
            icon: <HeartOutlined style={{ color: '#000' }} />,
        onClick: () => {
            console.log('Notification Clicked!');
        },
        placement: 'bottomRight'
        });
    };

    const addToPrefer = () => {
        openNotification();
        addPreferItem(dispatch, activity);
    };
    const removePrefer = () => {
        openNotification2();
        removeFromPrefer(dispatch, activity.id)
    };

    useEffect(()=>{
        Cookie.set("preferItems", JSON.stringify(preferItems));
     }, [preferItems])

    return (
        <>
        {InPrefer
            ? <HeartFilled className="btn-toprefer btn-heart" onClick={removePrefer}/>
            : <HeartOutlined className="btn-toprefer btn-heart" onClick={addToPrefer}/>
        }
        </>
    );
}