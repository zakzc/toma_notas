import React, { useState } from "react";
///
import { Row, Col, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import PenIcon from "./svg/PenIcon";
import SeeIcon from "./svg/SeeIcon";

const Header = ({ appMode, setAppMode }) => {
  const WriteViewSwitch = () => (
    <div className="centerPageStyle">
      <ToggleButton
        key={1}
        variant="flat"
        value="write"
        checked={appMode === true}
        type="radio"
        onClick={() => setAppMode(true)}
      >
        <SeeIcon />
      </ToggleButton>
      <ToggleButton
        key={2}
        variant="flat"
        value="read"
        name="radio"
        checked={appMode === false}
        type="radio"
        onClick={() => setAppMode(false)}
      >
        <PenIcon />
      </ToggleButton>
    </div>
  );

  return (
    <Row>
      <Col></Col>
      <Col>
        <br />
        <WriteViewSwitch />
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Header;
