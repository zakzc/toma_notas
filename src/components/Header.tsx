import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Header = ({ appMode, setAppMode }) => {
  const { t, i18n } = useTranslation();
  const WriteViewSwitch = () => (
    <div className="centerPageStyle">
      {appMode === 0 ? (
        <Button onClick={() => setAppMode(1)}>{t("view")}</Button>
      ) : (
        <Button onClick={() => setAppMode(0)}>{t("write")}</Button>
      )}
    </div>
  );

  return (
    <Row>
      <Col></Col>
      <Col>
        <WriteViewSwitch />
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Header;
