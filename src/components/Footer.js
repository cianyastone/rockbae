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
                        <img className="footer-icon" src="https://www.flaticon.com/svg/vstatic/svg/1051/1051258.svg?token=exp=1618205475~hmac=aa24e98315966c0fb6800d231a7a8f81" alt="facebook icon"/>
                        FACEBOOK
                    </Link>
                    <Link to="/" className="footer-item">
                        <img className="footer-icon" src="https://www.flaticon.com/svg/vstatic/svg/1051/1051262.svg?token=exp=1618205506~hmac=c15a1a5d64180f066b642956459c5783" alt="instagram icon"/>
                        INSTAGRAM
                    </Link>
                </Col>
            </Row>
            <p className="statement">Copyright@2021ROCKBAE</p>
        </footer>  
    );
}