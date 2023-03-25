import React, { useContext } from "react";
///
import { NoteAppContext } from "../../store/notes_context";
import { NoteInterface } from "../../data/interfaces";

export default function ViewNotes(): JSX.Element {
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
        indentStyle += indent.split("").join(".") + ". ";
        break;
      default:
        break;
    }
    return indentStyle;
  };
  ///
  interface IndentNotesInterface {
    notes: NoteInterface;
    key: number;
  }
  const IndentedNote = (props: IndentNotesInterface) => {
    let indent = props.notes.indentation;
    console.log(props);
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
          <IndentedNote notes={i} key={k} />
        ))
      ) : (
        <h4> No notes to show </h4>
      )}
    </>
  );
}
