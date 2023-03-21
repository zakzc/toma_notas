import { Row, Col } from "react-bootstrap";
import React from "react";
import { useTranslation } from "react-i18next";
///
import { Button } from "react-bootstrap";
///
import PenIcon from "./svg/PenIcon";
import SeeIcon from "./svg/SeeIcon";

const Header = ({ appMode, setAppMode }) => {
  const { t, i18n } = useTranslation();
  const WriteViewSwitch = () => (
    <div className="centerPageStyle">
      {appMode === false ? (
        <Button variant="flat" onClick={() => setAppMode(true)}>
          <PenIcon />
        </Button>
      ) : (
        <Button variant="flat"  onClick={() => setAppMode(false)}>
          <SeeIcon />
        </Button>
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
