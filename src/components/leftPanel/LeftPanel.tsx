import React from "react";
///
import UserNotes from "./UserNotes";
import CurrentNoteSet from "./CurrentNoteSet";
///
import { Row, Col, Button } from "react-bootstrap";
import ArrowLeft from "../svg/ArrowLeft";
import ArrowRight from "../svg/ArrowRight";

interface LeftPanelInterface {
  isOpenLeft: boolean;
  setIsOpenLeft: React.Dispatch<React.SetStateAction<boolean>>;
  appMode: boolean;
}

export default function LeftPanel(props: LeftPanelInterface): JSX.Element {
  ///
  const OpenCloseSideTabButton = () => (
    <Row>
      {props.isOpenLeft ? (
        <>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button
              variant="flat"
              size="lg"
              onClick={() => props.setIsOpenLeft(!props.isOpenLeft)}
            >
              <ArrowLeft />
            </Button>
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Button
              variant="flat"
              size="lg"
              onClick={() => props.setIsOpenLeft(!props.isOpenLeft)}
            >
              <ArrowRight />
            </Button>
          </Col>
        </>
      )}
    </Row>
  );

  return (
    <>
      <OpenCloseSideTabButton />
      {props.isOpenLeft ? (
        <>
          <CurrentNoteSet />
          <br />
          <br />
          <UserNotes />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
