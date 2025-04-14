import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Header.css'
import { Image } from 'react-bootstrap';
function Header() {
    return (
        <Container fluid >
            <Row>
                <Container className='header' >
                    <span>IBOVESPA</span>
                    <Image src='/assets/cash.webp' />
                </Container>
            </Row>
        </Container>
    );
}

export default Header;