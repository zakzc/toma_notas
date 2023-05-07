import React, { useState } from "react";
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
  // false for Write Mode, true for visualize mode
  const [appMode, setAppMode] = useState(1);

  const CurrentViewMode = () => {
    if (appMode === 1) {
      return <TextArea visualizationMode={appMode} />;
    } else if (appMode === 2) {
      return <Visualize />;
    } else {
      return (
       <EditMode/>
      );
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
              appMode={appMode}
            />
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Header appMode={appMode} setAppMode={setAppMode} />
            <CurrentViewMode/>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <RightPanel
              isOpenRight={isOpenRight}
              setIsOpenRight={setIsOpenRight}
              appMode={appMode}
              setAppMode={setAppMode}
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
