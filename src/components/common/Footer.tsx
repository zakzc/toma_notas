import React from "react";
// import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";

const Footer = (): JSX.Element => {
  // const Footer = ({ changeLanguage }): JSX.Element => {
  ///
  // const ChangeLanguageSwitch = () => (
  //   <>
  //     <Button onClick={() => changeLanguage("en")}> EN </Button>
  //     <span> - </span>
  //     <Button onClick={() => changeLanguage("pt")}> PT </Button>
  //   </>
  // );

  return (
    <Row>
      <Col></Col>
      <Col>
        <h1>Footer</h1>
        {/* <ChangeLanguageSwitch /> */}
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Footer;
