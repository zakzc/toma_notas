import React from "react";
// import { Link } from "react-router-dom";
import { Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
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

  return (
    <Col>
      <Button onClick={() => setIsOpenLeft(!isOpenLeft)}>View Notes</Button>
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
        <h2>closed</h2>
      )}
    </Col>
  );
}
