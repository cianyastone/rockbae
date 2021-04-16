import { useContext } from "react";
import { Button, notification } from "antd"
import { StoreContext } from "../store"
import { PREFER_ADD_ITEM } from "../utils/constants"
// import { PREFERIcon } from "./Icons";
import { HeartTwoTone } from '@ant-design/icons';

export default function AddToPrefer({activity}){
    const { dispatch } = useContext(StoreContext);

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
        <Button type="link" className="btn-toprefer" onClick={addToPrefer}>
            <HeartTwoTone twoToneColor="#eb2f96" />
        </Button>
    );
}