import React from "react";
///
import { Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
///
import ArrowLeft from "./svg/ArrowLeft"
import ArrowRight from "./svg/ArrowRight"

interface myNotesInterface {
  noteName: string;
  noteNumber: number;
}

interface LeftPanelInterface {
  isOpenLeft: boolean,
  setIsOpenLeft: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LeftPanel(props: LeftPanelInterface): JSX.Element {
  const { t } = useTranslation();
  // dummy value, actual values will come from DB
  const myNotes: myNotesInterface[] = [
    { noteName: "note 1", noteNumber: 12343 },
    { noteName: "note 2", noteNumber: 14343 },
    { noteName: "note 3", noteNumber: 22343 },
  ];
  
  
  const OpenCloseSideTabButton = () => (
    <Row>
      {props.isOpenLeft ? (
        <>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button variant="light" onClick={() => props.setIsOpenLeft(!props.isOpenLeft)}>
              <ArrowLeft />
            </Button>
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Button variant="light" onClick={() => props.setIsOpenLeft(!props.isOpenLeft)}>
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
          <h1>{t("yourNotes")}</h1>
          <ul>
            {myNotes.map((n) => (
              <li key={n.noteNumber}>{n.noteName}</li>
            ))}
          </ul>
          <ul>
            <li>{/* <Link to={`/login`}>Log in</Link> */}</li>
          </ul>
        </>
      ) : (
        <></>
      )}
    </Col>
  );
}
