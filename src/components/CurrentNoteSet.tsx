import React, { useContext } from "react";
///
import {Button, ButtonGroup } from "react-bootstrap";
///
import { NoteAppContext } from "../store/notes_context";
///

interface LeftPanelInterface {
  isOpenLeft: boolean;
  setIsOpenLeft: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CurrentNoteSet(props: LeftPanelInterface): JSX.Element {
  // const { t } = useTranslation();
  const noteCtx = useContext(NoteAppContext);
  const noteSets = noteCtx.noteSet;
  // dummy value, actual values will come from DB
  function setNewNoteSet(newNoteSet) {
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
