import { Container, Row, Col } from "react-bootstrap";

const MainView = () => (
  <>
    <Container>
      <Row>
        <Col>1 of 3</Col>
        <Col xs={5}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  </>
);

export default MainView;
