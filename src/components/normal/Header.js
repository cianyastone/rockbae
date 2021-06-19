import NavBar from "./NavBar";
import { Link } from "react-router-dom"
import { Row, Col } from 'antd';

export default function Header() {
   return (
      <Row className="header">
         <Col 
         xs={{ span: 12 }} 
         sm={{ span: 12 }} 
         lg={{ span: 6 }}
         xl={{ span: 6 }}
         xxl={{ span: 6 }}>
            <Link to="/">
               <img className="header-slogan" src="/images/rockbae-new-logo.png" alt="description"/>
            </Link>
         </Col>
         <Col xs={{ span: 12 }} 
                sm={{ span: 12 }} 
                lg={{ span: 18 }}
                xl={{ span: 18 }}
                xxl={{ span: 18 }}>
            <NavBar />
         </Col>
      </Row>
      /**/
   );
}