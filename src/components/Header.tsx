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
      {appMode === 0 ? (
        <Button variant="light" onClick={() => setAppMode(1)}>
          <PenIcon />
        </Button>
      ) : (
        <Button variant="light"  onClick={() => setAppMode(0)}>
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
