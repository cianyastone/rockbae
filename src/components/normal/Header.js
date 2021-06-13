import NavBar from "./NavBar";
import { Link } from "react-router-dom"
import { Row, Col } from 'antd';

export default function Header() {
   return (
      <Row className="header">
         <Col span={6}>
            <Link to="/">
               <img className="header-slogan" src="/images/rockbae-new-logo.png" alt="description"/>
            </Link>
         </Col>
         <Col span={18}>
            <NavBar />
         </Col>
      </Row>
      /**/
   );
}