import { Carousel } from "antd";
import { Link } from 'react-router-dom';
import activity from '../../json/activity.json';
import { useContext } from "react";
import { StoreContext } from "../../store"
import { setActivityDetail } from "../../actions";

export default function Slide() {
    const { state: { page: { activities } } } = useContext(StoreContext);
    return(
        <Carousel autoplay 
            className="Slide">
        {[...Array(activities.length).keys()].map((x) => (
            <Link to={`/activity/${activities[x].id}`}
                onClick={() => {setActivityDetail(activities[x].id, 0, 1);}}
            >
                <img
                    className="Slide"
                    // style={{width: '100%'}}
                    src={activities[x].image2}
                    alt={activities[x].name} />
            </Link>
        ))}
        </Carousel> 
    );
}