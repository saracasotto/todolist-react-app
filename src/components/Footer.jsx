import { Row, Container, Col} from 'react-bootstrap';

function Footer(){
    return (

        <Container>
            <Row>
                <Col md={6}>Contenuto di destra</Col>
                <Col md={6}>Contenuto di sinistra</Col>
            </Row>
        </Container>
    )
}

export default Footer