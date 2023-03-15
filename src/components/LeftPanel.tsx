import React, {useContext} from "react";
///
import { Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
///
import NotesContext from "../store/notes_context";
///
import ArrowLeft from "./svg/ArrowLeft";
import ArrowRight from "./svg/ArrowRight";

interface LeftPanelInterface {
  isOpenLeft: boolean;
  setIsOpenLeft: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LeftPanel(props: LeftPanelInterface): JSX.Element {
  const { t } = useTranslation();
    const noteCtx = useContext(NotesContext);
    console.log(noteCtx.nodeSet);
  // dummy value, actual values will come from DB

  const MyNotes = (): JSX.Element => {
    return (
      <>
        {noteCtx.nodeSet.map((i, k) => (
          <p key={k}>{i.noteSetName}</p>
        ))}
      </>
    );
  };

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
          <h1>{t("yourNotes")}</h1>
          <MyNotes/>
        </>
      ) : (
        <></>
      )}
    </Col>
  );
}
