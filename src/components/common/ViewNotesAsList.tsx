import React, { useContext } from "react";
///
import { NoteAppContext } from "../../store/notes_context";
import { NoteInterface } from "../../data/interfaces";
//
import { Button, Row, Col } from "react-bootstrap";
//
import Garbage from "../svg/Garbage";
import Eraser from "../svg/SmallEraser";

interface ViewNotesInterface {
  viewIndent: boolean;
}

export default function ViewNotesAsList(
  props: ViewNotesInterface
): JSX.Element {
  const {
    currentViewMode,
    currentlySelectedNoteSet,
    deleteNoteFromCurrentSet,
    setNoteToEdit, setCurrentVisualizationMode
  } = useContext(NoteAppContext);
  const currentSet = currentlySelectedNoteSet.noteSetNote;
  ///
  const getIndentationStyle = (indent: string) => {
    let indentStyle = "";
    switch (currentViewMode) {
      // simple note rendering, no levels
      case 0:
        break;
      // numbered
      case 1:
        indentStyle += indent;
        break;
      default:
        break;
    }
    return indentStyle;
  };
  ///
  interface FlatNotesInterface {
    notes: NoteInterface;
    key: number;
  }
  const FlatNote = (props: FlatNotesInterface) => <p>{props.notes.noteText}</p>;
  //
  interface IndentNotesInterface {
    notes: NoteInterface;
    key: number;
  }
  const IndentedNote = (props: IndentNotesInterface) => {
    let indent = props.notes.indentation;
    const indentationStyle = getIndentationStyle(indent);
    let indentation =
      indentationStyle === "0" ? "" : `\xa0\xa0\xa0\xa0`.repeat(indent.length);
    return (
      <p>
        {indentation}
        {indentationStyle}
        {props.notes.noteText}
      </p>
    );
  };
  ///
  function eraseNote(id: string) {
    deleteNoteFromCurrentSet(id)
    setNoteToEdit(undefined);
  }

  function editNote(thisNoteToEdit: NoteInterface) {
    setCurrentVisualizationMode(3);
    setNoteToEdit(thisNoteToEdit);
    console.log("Edit this note", thisNoteToEdit);
  }
  ///
  return (
    <>
      {currentSet ? (
        currentSet.map((i: NoteInterface, k: number) => (
          <>
            {props.viewIndent === false ? (
              <Row>
                <Col md="auto">
                  <FlatNote notes={i} key={k} />
                </Col>
                <Col></Col>
                <Col>
                  <Button variant="flat" size="sm" onClick={() => eraseNote(i.noteTextId)}>
                    <Garbage />
                  </Button>
                  <Button variant="flat" size="sm" onClick={() => editNote(i)}>
                    <Eraser />
                  </Button>
                </Col>
              </Row>
            ) : (
              <IndentedNote notes={i} key={k + 10} />
            )}
          </>
        ))
      ) : (
        <h4> No notes to show </h4>
      )}
    </>
  );
}
