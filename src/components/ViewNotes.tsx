import React, { useContext } from "react";
// import { useTranslation } from "react-i18next";
///
import { NoteAppContext } from "../store/notes_context";

export default function ViewNotes(): JSX.Element {
  // const { t } = useTranslation();
  const noteCtx = useContext(NoteAppContext);
  const currentNode = noteCtx.currentlySelectedNoteSet;
  const currentSet = currentNode.noteSetNote;
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
  const IndentedNote = (eachNote) => {
    let indent = eachNote.eachNote.indentation;
    const indentationStyle = getIndentationStyle(indent);
    let indentation =
      indentationStyle === "0" ? "" : `\xa0\xa0\xa0\xa0`.repeat(indent.length);
    return (
      <p>
        {indentation}
        {indentationStyle}
        {eachNote.eachNote.noteText}
      </p>
    );
  };
  ///
  return (
    <>
      {currentSet.map((i, k) => (
        <IndentedNote eachNote={i} key={k} />
      ))}
    </>
  );
}
