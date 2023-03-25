import React, { useState } from "react";
//
import { Container, Row, Col } from "react-bootstrap";
import TextArea from "./centralPanel/TextArea";
import Visualise from "./centralPanel/Visualise";
import LeftPanel from "./leftPanel/LeftPanel";
import RightPanel from "./rightPanel/RightPanel";
import Header from "./common/Header";
// import Footer from "./Footer";

const Layout = (): JSX.Element => {
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const [isOpenRight, setIsOpenRight] = useState(false);
  // false for Write Mode, true for visualise mode
  const [appMode, setAppMode] = useState(false);
  // const { t, i18n } = useTranslation();

  // function changeLanguage(lng: string) {
  //   i18n.changeLanguage(lng);
  // }

  return (<>
      <Container fluid>
        <Row>
          <Header appMode={appMode} setAppMode={setAppMode} />
        </Row>
        <Row>
          <Col xs={12} sm={12} md={3}>
            <LeftPanel isOpenLeft={isOpenLeft} setIsOpenLeft={setIsOpenLeft} appMode={appMode}/>
          </Col>
          <Col xs={12} sm={12} md={6}>
            {appMode===false ? <TextArea /> : <Visualise />}
          </Col>
          <Col xs={12} sm={12} md={3}>
            <RightPanel
              isOpenRight={isOpenRight}
              setIsOpenRight={setIsOpenRight}
              appMode={appMode}
            />
          </Col>
        </Row>
        {/* <Footer changeLanguage={changeLanguage} /> */}
      </Container>
    </>
  );
};

export default Layout;
