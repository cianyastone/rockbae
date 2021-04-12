import { Carousel } from "antd";
import { Link } from 'react-router-dom';
import cook from '../json/cookware';
import activitys from '../json/activity';

export default function Slide({match}) {
    const contentStyle = {
        height: '350px',
        color: '#000',
        lineHeight: '350px',
        textAlign: 'center',
    };
    // const activity = activitys.find(
    //     x => x.id === match.params.productId
    //  );
    return(
        <div>
        {/* {activitys.map(activity => ( */}
            <Carousel autoplay>
            <div>
            <img
                style={{ width: '100%' }}
                src={cook.image}
                alt={cook.name} />
            </div>
            {/* <div>
            <h3 style={contentStyle}>2</h3>
            </div>
            <div>
            <h3 style={contentStyle}>3</h3>
            </div>
            <div>
            <h3 style={contentStyle}>4</h3>
            </div> */}
            </Carousel>
        {/* ))} */}
        </div>
        
    );
}