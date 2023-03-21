import React, { useContext } from "react";
///
import CurrentNoteSet from "./CurrentNoteSet";
///
import { NoteAppContext } from "../store/notes_context";
///
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import ArrowLeft from "./svg/ArrowLeft";
import ArrowRight from "./svg/ArrowRight";

interface LeftPanelInterface {
  isOpenLeft: boolean;
  setIsOpenLeft: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LeftPanel(props: LeftPanelInterface): JSX.Element {
  const OpenCloseSideTabButton = () => (
    <Row>
      {props.isOpenLeft ? (
        <>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button
              variant="flat"
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
    <Col>
      <OpenCloseSideTabButton />
      {props.isOpenLeft ? (
        <>
          {/* <h3>{t("yourNotes")}</h3> */}
          <h3>Your notes:</h3>
          {/* <MyNotes /> */}
          <CurrentNoteSet />
          <br />
        </>
      ) : (
        <></>
      )}
    </Col>
  );
}
