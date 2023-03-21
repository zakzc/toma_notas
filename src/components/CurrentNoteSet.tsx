import React, { useContext } from "react";
///
import {Button, ButtonGroup } from "react-bootstrap";
///
import { NoteAppContext } from "../store/notes_context";
import { NoteSetInterface} from "../data/interfaces"
///

export default function CurrentNoteSet(): JSX.Element {
  // const { t } = useTranslation();
  const noteCtx = useContext(NoteAppContext);
  const noteSets: NoteSetInterface[] = noteCtx.noteSet;
  // dummy value, actual values will come from DB
  function setNewNoteSet(newNoteSet: NoteSetInterface) {
    noteCtx.setCurrentlySelectedNoteSet(newNoteSet);
  }

  return (
    <>
      <ButtonGroup vertical>
        {noteSets.map((i, k) => (
          <Button
            variant="flat"
            key={k}
            style={{ display: "flex", justifyContent: "flex-start" }}
            onClick={() => setNewNoteSet(i)}
          >
            {i.noteSetName}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
