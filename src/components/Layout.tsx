import { Container, Row, Col } from "react-bootstrap";
import TextArea from "./TextArea";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const Layout = () => (
  <>
    <Container>
      <Row>
        <Col>
          <LeftPanel />
        </Col>
        <Col xs={5}>
          <TextArea />
        </Col>
        <Col>
          <RightPanel />
        </Col>
      </Row>
    </Container>
  </>
);

export default Layout;
