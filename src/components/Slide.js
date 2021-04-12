import { Carousel } from "antd";
import { Link } from 'react-router-dom';
import cook from '../json/cookware';
import activity from '../json/activity.json';

export default function Slide({match}) {
    const contentStyle = {
        height: '350px',
        color: '#000',
        display: 'flex',
    };
    // const activities
    // const activities = activity.find(
    //     x => x.id === match.params.activityId
    //  );
    return(
        <Carousel autoplay 
            className="Slide">
        <div>
        <img
            className="Slide"
            // style={{width: '100%'}}
            src={activity[0].image2}
            alt={activity[0].name} />
        </div>
        <div>
        <img
            className="Slide"
            // style={{width: '100%'}}
            src={activity[1].image2}
            alt={activity[1].name} />
        </div>
        <div>
        <img
            className="Slide"
            src={activity[2].image2}
            alt={activity[2].name} />
        </div>
        <div>
        <img
            className="Slide"
            src={activity[3].image2}
            alt={activity[3].name} />
        </div>
        <div>
        <img
            className="Slide"
            src={activity[4].image2}
            alt={activity[4].name} />
        </div>
        </Carousel> 
    );
}