import NavBar from "./NavBar";
import { Link } from "react-router-dom"
import { Row, Col } from 'antd';

export default function Header() {
   return (
      <div className="header">
         <Row>
            <Col span={18} push={6}>
               <NavBar />
            </Col>
            <Col span={6} pull={18}>
               <Link to="/">
                  <img className="header-slogan" src="https://i.pinimg.com/564x/09/79/8f/09798f85e707c8e84d3e8460318d4998.jpg" alt="description"/>
               </Link>
            </Col>
         </Row>
      </div>
   );
}