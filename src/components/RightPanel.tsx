import React from "react";
import { useTranslation } from "react-i18next";
///
import { Row, Col, Button } from "react-bootstrap";
///
import ArrowLeft from "./svg/ArrowLeft";
import ArrowRight from "./svg/ArrowRight";

interface RightPanelInterface {
  isOpenRight: boolean;
  setIsOpenRight: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RightPanel(props: RightPanelInterface): JSX.Element {
  const { t } = useTranslation();
  const myViewingOptions = [
    "simpleView",
    "numberedView",
    "levelView",
    "cornelView",
    "flashcardsView",
  ];

  const OpenCloseSideTabButton = () => (
    <Row>
      {props.isOpenRight ? (
        <>
          <Col>
            <Button
              variant="light"
              onClick={() => props.setIsOpenRight(!props.isOpenRight)}
            >
              <ArrowRight />
            </Button>
          </Col>
        </>
      ) : (
        <>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button
              variant="light"
              onClick={() => props.setIsOpenRight(!props.isOpenRight)}
            >
              <ArrowLeft />
            </Button>
          </Col>
        </>
      )}
    </Row>
  );

  return (
    <Col>
      <OpenCloseSideTabButton />
      {props.isOpenRight ? (
        <>
          <h1>{t("view")}</h1>
          <ul>
            {myViewingOptions.map((v, i) => (
              <li key={i}>{t(v)}</li>
            ))}
          </ul>
        </>
      ) : (
        <></>
      )}
    </Col>
  );
}
