import { Carousel } from "antd";
import { Link } from 'react-router-dom';
import activity from '../../json/activity.json';

export default function Slide({match}) {
    return(
        <Carousel autoplay 
            className="Slide">
        <div>
        <Link to={`/activity/${activity[0].id}`}>
            <img
                className="Slide"
                // style={{width: '100%'}}
                src={activity[0].image2}
                alt={activity[0].name} />
        </Link>
        </div>
        <div>
        <Link to={`/activity/${activity[1].id}`}>
            <img
                className="Slide"
                // style={{width: '100%'}}
                src={activity[1].image2}
                alt={activity[1].name} />
        </Link>
        </div>
        <div>
        <Link to={`/activity/${activity[2].id}`}>
            <img
                className="Slide"
                src={activity[2].image2}
                alt={activity[2].name} />
        </Link>
        </div>
        <div>
        <Link to={`/activity/${activity[3].id}`}>
            <img
                className="Slide"
                src={activity[3].image2}
                alt={activity[3].name} />
        </Link>
        </div>
        <div>
        <Link to={`/activity/${activity[4].id}`}>
            <img
                className="Slide"
                src={activity[4].image2}
                alt={activity[4].name} />
        </Link>
        </div>
        </Carousel> 
    );
}