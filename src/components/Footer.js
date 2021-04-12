import { Link } from "react-router-dom";
import { Row, Col } from 'antd';
export default function Footer() {
    return (
        <footer className="footer">
            <Row>
                <Col className="footer-area" span={8}>
                <p className="footer-title">關於我們</p>
                    <Link to="/" className="footer-item">
                        煞氣ㄉ音樂祭
                    </Link>
                    <Link to="/" className="footer-item">
                        想去ㄉ活動
                    </Link>    
                </Col>
                <Col className="footer-area" span={8}>
                    <p className="footer-title">顧客服務</p>
                    <Link to="/" className="footer-item">
                        婐ㄉ購物車
                    </Link>
                    <Link to="/" className="footer-item">
                        條款與細則
                    </Link>
                </Col>
                <Col className="footer-area" span={8}>
                    <p className="footer-title">關注我們</p>
                    <Link to="/" className="footer-item">
                        <img className="footer-icon" src="facebook.png" alt="facebook icon"/>
                        FACEBOOK
                    </Link>
                    <Link to="/" className="footer-item">
                        <img className="footer-icon" src="instagram.png" alt="instagram icon"/>
                        INSTAGRAM
                    </Link>
                </Col>
            </Row>
            <p className="statement">Copyright@2021ROCKBAE</p>
        </footer>  
    );
}