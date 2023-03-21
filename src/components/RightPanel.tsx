import React, { useContext } from "react";
// import { useTranslation } from "react-i18next";
///
import { NoteAppContext } from "../store/notes_context";
///
import ViewNotes from "./ViewNotes"
///
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import ArrowLeft from "./svg/ArrowLeft";
import ArrowRight from "./svg/ArrowRight";

interface RightPanelInterface {
  isOpenRight: boolean;
  setIsOpenRight: React.Dispatch<React.SetStateAction<boolean>>;
  appMode: boolean;
}

export default function RightPanel(props: RightPanelInterface): JSX.Element {
  // const { t } = useTranslation();
  const noteCtx = useContext(NoteAppContext);
  const myViewingOptions = [
    { option: 0, name: "View notes" },
    { option: 1, name: "View notes numbered" },
    { option: 2, name: "View notes with levels" },
    { option: 3, name: "View Notes as Cornel method" },
    { option: 4, name: "View Notes as Flashcards" },
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
              variant="flat"
              onClick={() => props.setIsOpenRight(!props.isOpenRight)}
            >
              <ArrowLeft />
            </Button>
          </Col>
        </>
      )}
    </Row>
  );

  const ViewMode = () => (
    <>
      {" "}
      <h3>Visualization options:</h3>
      <ButtonGroup vertical>
        {myViewingOptions.map((i, k) => (
          <Button
            variant="flat"
            key={k}
            style={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => noteCtx.setCurrentViewMode(i.option)}
          >
            {i.name}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );

  const ViewOptions = () => (
    <>{props.appMode === true ? <ViewMode /> : <ViewNotes />}</>
  );

  return (
    <Col>
      <OpenCloseSideTabButton />
      {props.isOpenRight ? <ViewOptions /> : <></>}
    </Col>
  );
}
