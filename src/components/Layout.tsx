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
            <LeftPanel isOpenLeft={isOpenLeft} setIsOpenLeft={setIsOpenLeft} />
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
