import React, { useContext } from "react";
// import { useTranslation } from "react-i18next";
///
import { NoteAppContext } from "../../store/notes_context";
///
import ViewNotesAsList from "../common/ViewNotesAsList";
///
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import ArrowLeft from "../svg/ArrowLeft";
import ArrowRight from "../svg/ArrowRight";

interface RightPanelInterface {
  isOpenRight: boolean;
  setIsOpenRight: React.Dispatch<boolean>;
}

export default function RightPanel(props: RightPanelInterface): JSX.Element {
  const { currentVisualizationMode,  setCurrentViewMode } = useContext(NoteAppContext);
  const myViewingOptions = [
    { option: 0, name: "View notes" },
    { option: 1, name: "View notes with indent" },
    { option: 2, name: "View notes numbered" },
    { option: 3, name: "View notes with levels" },
    { option: 4, name: "View Notes as Flashcards" },
  ];

  const OpenCloseSideTabButton = () => (
    <Row>
      {props.isOpenRight ? (
        <>
          <Col>
            <Button
              variant="flat"
              size="lg"
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
              size="lg"
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
            size="lg"
            key={k}
            style={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => setCurrentViewMode(i.option)}
          >
            {i.name}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );

  const ViewOptions = () => (
    <>
      {currentVisualizationMode === 2 ? (
        <ViewMode />
      ) : (
        <ViewNotesAsList viewIndent={false} />
      )}
    </>
  );

  return (
    <Col>
      <OpenCloseSideTabButton />
      {props.isOpenRight ? <ViewOptions /> : <></>}
    </Col>
  );
}
