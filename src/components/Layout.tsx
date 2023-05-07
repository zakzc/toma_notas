import React, { useState, useContext } from "react";
//
import { NoteAppContext } from "../store/notes_context";
//
import { Container, Row, Col } from "react-bootstrap";
import TextArea from "./centralPanel/TextArea";
import Visualize from "./centralPanel/Visualize";
import EditMode from "./centralPanel/EditMode";
import LeftPanel from "./leftPanel/LeftPanel";
import RightPanel from "./rightPanel/RightPanel";
import Header from "./common/Header";

const Layout = (): JSX.Element => {
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const [isOpenRight, setIsOpenRight] = useState(false);
    const {
      currentVisualizationMode
    } = useContext(NoteAppContext);


  const CurrentViewMode = () => {
    if (currentVisualizationMode === 1) {
      return <TextArea />;
    } else if (currentVisualizationMode === 2) {
      return <Visualize />;
    } else {
      return <EditMode />;
    }
  };

  const BaseLayout = () => (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={3}>
            <LeftPanel
              isOpenLeft={isOpenLeft}
              setIsOpenLeft={setIsOpenLeft}
            />
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Header />
            <CurrentViewMode/>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <RightPanel
              isOpenRight={isOpenRight}
              setIsOpenRight={setIsOpenRight}
            />
          </Col>
        </Row>
      </Container>
    </>
  );

  return (
    <>
      <BaseLayout />
    </>
  );
};

export default Layout;
