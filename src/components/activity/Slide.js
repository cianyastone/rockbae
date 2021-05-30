import { Carousel } from "antd";
import { Link } from 'react-router-dom';
import activity from '../../json/activity.json';
import { useContext } from "react";
import { StoreContext } from "../../store"
import { setActivityDetail } from "../../actions";

export default function Slide() {
    const { dispatch } = useContext(StoreContext);
    return(
        <Carousel autoplay 
            className="Slide">
        <div>
        <Link to={`/activity/${activity[0].id}`}
            onClick={() => {setActivityDetail(dispatch, activity[0].id, 0, 1);}}
        >
            <img
                className="Slide"
                // style={{width: '100%'}}
                src={activity[0].image2}
                alt={activity[0].name} />
        </Link>
        </div>
        <div>
        <Link to={`/activity/${activity[1].id}`}
            onClick={() => {setActivityDetail(dispatch, activity[1].id, 0, 1);}}
        >
            <img
                className="Slide"
                // style={{width: '100%'}}
                src={activity[1].image2}
                alt={activity[1].name} />
        </Link>
        </div>
        <div>
        <Link to={`/activity/${activity[2].id}`}
            onClick={() => {setActivityDetail(dispatch, activity[2].id, 0, 1);}}
        >
            <img
                className="Slide"
                src={activity[2].image2}
                alt={activity[2].name} />
        </Link>
        </div>
        <div>
        <Link to={`/activity/${activity[3].id}`}
            onClick={() => {setActivityDetail(dispatch, activity[3].id, 0, 1);}}
        >
            <img
                className="Slide"
                src={activity[3].image2}
                alt={activity[3].name} />
        </Link>
        </div>
        <div>
        <Link to={`/activity/${activity[4].id}`}
            onClick={() => {setActivityDetail(dispatch, activity[4].id, 0, 1);}}
        >
            <img
                className="Slide"
                src={activity[4].image2}
                alt={activity[4].name} />
        </Link>
        </div>
        </Carousel> 
    );
}