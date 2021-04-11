import NavBar from "./NavBar";
import { Link } from "react-router-dom"
import { Row, Col } from 'antd';

export default function Header({title}) {
   return (
      <div className="header">
            <Row>
               <Col span={18} push={6}>
                  <NavBar />
               </Col>
               <Col span={6} pull={18}>
                  <Link to="/">
                     <img className="header-slogan" src="logo.png" alt="description"/>
                  </Link>
               </Col>
            </Row>
      </div>
   );
}