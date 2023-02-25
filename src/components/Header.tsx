import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  return (
    <Row>
      <Col></Col>
      <Col>
        <h1>Header</h1>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Header;
