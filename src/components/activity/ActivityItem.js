import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import AddToPrefer from "../prefer/AddToPrefer"
import { useState, useContext } from "react";
import { StoreContext } from "../../store"
import { setActivityDetail } from "../../actions";

export default function ActivityItem({ activity }) {
    const [open, setOpen] = useState(false);
    const { dispatch } = useContext(StoreContext);
    const styles = useSpring( open ? {
        from: { y: 0 },
        to: { y:40 },
    }:{
        from: { y: 40 },
        to: { y: 0 },
    })
    const hover = useSpring( open ? {
        from: { opacity: 0 },
        to: { opacity: 1 }
    }:{ 
        from: { opacity: 1 },
        to: { opacity: 0 }
    })
    const imgHover = useSpring( open ? {
        from: { opacity: 1 },to: { opacity: 0.4 },
    }:{ 
        from: { opacity: 0.4 },
        to: { opacity: 1 },
    })

    
    return (
        <>
        <div class="activityItem-container" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <Link to={`/activity/${activity.id}`}
            onClick={() => {
                setActivityDetail(dispatch, activity.id, 0, 1);
            }}
        >
            <animated.img 
                style={{ 
                    ...styles,
                    ...imgHover
                }} 
                src={activity.image} 
                className="activityItem-img"
            />
            <animated.div style={{ ...styles, ...hover }} className="activityItem-mouseIn">
                <h2 className="activityItem-text">{activity.name}</h2> 
            </animated.div>
        </Link>
        <animated.div style={{ ...styles, ...hover }} className="activityItem-mouseIn">
                <h2 className="activityItem-text">{activity.name}</h2> 
                <AddToPrefer activity={activity}/>
        </animated.div>
        </div>
        </>
    );
}
