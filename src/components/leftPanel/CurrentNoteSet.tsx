import React, { useContext } from "react";
///
import { Button, ButtonGroup } from "react-bootstrap";
///
import { NoteAppContext } from "../../store/notes_context";
import { NoteSetInterface } from "../../data/interfaces";
///

export default function CurrentNoteSet(): JSX.Element {
  // const { t } = useTranslation();
  const noteCtx = useContext(NoteAppContext);
  const noteSets: NoteSetInterface[] = noteCtx.noteSet;
  // dummy value, actual values will come from DB
  function setNewNoteSet(newNoteSet: NoteSetInterface) {
    noteCtx.setCurrentlySelectedNoteSet(newNoteSet);
  }
  // TODO this here:
  // function handleSelectNewNoteSet


  
const getFontWeight = (i) => {
  if (noteCtx.currentlySelectedNoteSet &&  noteCtx.currentlySelectedNoteSet.noteSetName && i.noteSetName === noteCtx.currentlySelectedNoteSet.noteSetName) {
    return 800
  } 
  return "normal"
}
  ///
  return (
    <>
      <ButtonGroup vertical>
        {noteSets.map((i, k) => (
          <Button
            variant="flat"
            key={k}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              fontWeight: getFontWeight(i),
            }}
            onClick={() => setNewNoteSet(i)}
          >
            {i.noteSetName}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
