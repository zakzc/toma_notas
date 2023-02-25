import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Col, Button } from "react-bootstrap";
import styles from "../Styles/rightPanelStyle.module.css";

export default function RightPanel({
  isOpenRight,
  setIsOpenRight,
}): JSX.Element {
  const { t } = useTranslation();
  const myViewingOptions = [
    "simpleView",
    "numberedView",
    "levelView",
    "cornelView",
    "flashcardsView",
  ];
  return (
    <Col>
      <Button onClick={() => setIsOpenRight(!isOpenRight)}>View element</Button>
      {isOpenRight ? (
        <>
          <h1>{t("view")}</h1>
          <ul>
            {myViewingOptions.map((v, i) => (
              <li key={i}>{t(v)}</li>
            ))}
          </ul>
        </>
      ) : (
        <h2>Closed</h2>
      )}
    </Col>
  );
}
