import React from "react";
// import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BsArrowLeftCircle } from "react-icons/bs";
// import styles from "../styles/leftPanelStyle.module.css";

interface myNotesInterface {
  noteName: string;
  noteNumber: number;
}

export default function LeftPanel({ isOpenLeft, setIsOpenLeft }): JSX.Element {
  const { t } = useTranslation();
  // dummy value, actual values will come from DB
  const myNotes: myNotesInterface[] = [
    { noteName: "note 1", noteNumber: 12343 },
    { noteName: "note 2", noteNumber: 14343 },
    { noteName: "note 3", noteNumber: 22343 },
  ];
  const ArrowLeft = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-arrow-left"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
      />
    </svg>
  );
  
  const ArrowRight = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-arrow-right"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
      />
    </svg>
  );

  const OpenCloseSideTabButton = () => (
    <Row>
      {isOpenLeft ? (
        <>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button variant="light" onClick={() => setIsOpenLeft(!isOpenLeft)}>
              <ArrowLeft />
            </Button>
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Button variant="light" onClick={() => setIsOpenLeft(!isOpenLeft)}>
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
      {isOpenLeft ? (
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
