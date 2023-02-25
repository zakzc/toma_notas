import React, { useState } from "react";
import { useTranslation } from "react-i18next";
//
import { Container, Row, Col } from "react-bootstrap";
//
import TextArea from "./TextArea";
import Visualise from "./Visualise";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (): JSX.Element => {
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const [isOpenRight, setIsOpenRight] = useState(false);
  // 0 for Write Mode, 1 for visualise mode
  const [appMode, setAppMode] = useState(0);
  const { t, i18n } = useTranslation();

  function changeLanguage(lng: string) {
    i18n.changeLanguage(lng);
  }

  return (
    <>
      <Container fluid>
        <Header appMode={appMode} setAppMode={setAppMode} />
        <Row>
          <Col xs={12} md={3}>
            <LeftPanel isOpenLeft={isOpenLeft} setIsOpenLeft={setIsOpenLeft} />
          </Col>
          <Col xs={12} md={6}>
            {appMode ? <TextArea /> : <Visualise />}
          </Col>
          <Col xs={12} md={3}>
            <RightPanel
              isOpenRight={isOpenRight}
              setIsOpenRight={setIsOpenRight}
            />
          </Col>
        </Row>
        <Footer changeLanguage={changeLanguage} />
      </Container>
    </>
  );
};

export default Layout;
