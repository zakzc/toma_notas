import React, { useContext } from "react";
///
import { Button, ButtonGroup } from "react-bootstrap";
///
import { NoteAppContext } from "../../store/notes_context";
import { NoteSetInterface } from "../../data/interfaces";
///

export default function CurrentNoteSet(): JSX.Element {
  // const { t } = useTranslation();
  const { noteSets, currentlySelectedNoteSet, setCurrentlySelectedNoteSet } =
    useContext(NoteAppContext);
  // const noteSets: NoteSetInterface[] = noteCtx.noteSets;
  // dummy value, actual values will come from DB
  function setNewNoteSet(newNoteSet: NoteSetInterface) {
    setCurrentlySelectedNoteSet(newNoteSet);
  }
  // TODO this here:
  // function handleSelectNewNoteSet


  
const getFontWeight = (i: NoteSetInterface) => {
  if (currentlySelectedNoteSet &&  currentlySelectedNoteSet.noteSetName && i.noteSetName === currentlySelectedNoteSet.noteSetName) {
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
