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
                    <Link to="/Prefer" className="footer-item">
                        想去ㄉ活動
                    </Link>    
                </Col>
                <Col className="footer-area" span={8}>
                    <p className="footer-title">顧客服務</p>
                    <Link to="/" className="footer-item">
                        條款與細則
                    </Link>
                </Col>
                <Col className="footer-area" span={8}>
                    <p className="footer-title">關注我們</p>
                    <Link to="/" className="footer-item">
                        <img className="footer-icon" src="https://i.pinimg.com/originals/4e/de/f9/4edef9108182a9ba8dde53eb3fd52675.png" alt="facebook icon"/>
                        FACEBOOK
                    </Link>
                    <Link to="/" className="footer-item">
                        <img className="footer-icon" src="https://i.pinimg.com/originals/6a/9f/b2/6a9fb2ed267819dd5076b8865f849eeb.png" alt="instagram icon"/>
                        INSTAGRAM
                    </Link>
                </Col>
            </Row>
            <p className="statement">Copyright@2021ROCKBAE</p>
        </footer>  
    );
}