import React, { useContext } from "react";
///
import { NoteAppContext } from "../../store/notes_context";
import { NoteInterface } from "../../data/interfaces";
//
import { Button } from "react-bootstrap";
//
import Garbage from "../svg/Garbage";
import Eraser from "../svg/Eraser";

interface ViewNotesInterface {
  viewIndent: boolean;
}

export default function ViewNotes(props: ViewNotesInterface): JSX.Element {
  const noteCtx = useContext(NoteAppContext);
  const currentSet = noteCtx.currentlySelectedNoteSet.noteSetNote;
  ///
  const getIndentationStyle = (indent: string) => {
    let indentStyle = "";
    switch (noteCtx.currentViewMode) {
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
  return (
    <>
      {currentSet ? (
        currentSet.map((i: NoteInterface, k: number) => (
          <>
            {props.viewIndent === false ? (
              <FlatNote notes={i} key={k} />
            ) : (
              <IndentedNote notes={i} key={k} />
            )}
            {props.viewIndent === false ? (
              <>
                <Button
                  variant="flat"
                  size="sm"
                  onClick={() => console.log("erase")}
                >
                  <Garbage />
                </Button>
                <Button
                  variant="flat"
                  size="sm"
                  onClick={() => console.log("edit")}
                >
                  <Eraser />
                </Button>
              </>
            ) : (
              <></>
            )}
          </>
        ))
      ) : (
        <h4> No notes to show </h4>
      )}
    </>
  );
}
