import { Carousel } from "antd";
import { Link } from 'react-router-dom';
import cook from '../json/cookware';
import activity from '../json/activity.json';

export default function Slide({match}) {
    const contentStyle = {
        height: '350px',
        color: '#000',
        lineHeight: '350px',
        textAlign: 'center',
    };
    // const activities
    // const activities = activity.find(
    //     x => x.id === match.params.activityId
    //  );
    return(
        <Carousel autoplay>
        <div>
        <img
            style={{ width: '100%', contentStyle}}
            src={activity[0].image2}
            alt={activity[0].name} />
        </div>
        <div>
        <img
            style={{ width: '100%', contentStyle}}
            src={activity[1].image2}
            alt={activity[1].name} />
        </div>
        {/* <div>
        <h3 style={contentStyle}>3</h3>
        </div>
        <div>
        <h3 style={contentStyle}>4</h3>
        </div> */}
        </Carousel> 
    );
}