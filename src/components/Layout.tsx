import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
//
import TextArea from "./TextArea";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => (
  <>
    <Container>
      <Row>
        <Header />
      </Row>
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
      <Row>
        <Footer />
      </Row>
    </Container>
  </>
);

export default Layout;
