import React, { createContext, useState } from "react";
///
import dummyDataForTest from "../data/dummyDataForTest.json";
import { NoteContextInterface, NoteSetInterface } from "../data/interfaces";

export const NoteAppContext = createContext<NoteContextInterface>({
  noteSet: [],
  numberOfNotes: 0,
  currentlySelectedNoteSet: {},
  setCurrentlySelectedNoteSet: () => {},
  addUserNote: () => {},
  currentViewMode: 0,
  setCurrentViewMode: () => {},
  AddNewNoteToCurrentSet: () => {},
});

const NoteAppContextProvider: React.FC = ({ children }) => {
  const [userNoteSet, setUserNoteSet] =
    useState<NoteSetInterface[]>(dummyDataForTest);
  const [selectedNoteSet, setSelectedNoteSet] = useState(userNoteSet[0]);
  const [currentViewMode, setCurrentViewMode] = useState(false);
  ///
  function changeSelectedNoteSet(noteSetToSelect: NoteSetInterface) {
    setSelectedNoteSet(noteSetToSelect);
  }
  function addNewUserNote(noteName: string) {
    setUserNoteSet([
      ...userNoteSet,
      {
        noteSetId: 5,
        noteSetName: noteName,
        noteSetNote: [{ noteText: "", noteTextId: "0", indentation: "0" }],
      },
    ]);
    setSelectedNoteSet({
      noteSetId: 5,
      noteSetName: noteName,
      noteSetNote: [],
    });
  }

  function addNewNoteToCurrentSet(noteToAdd) {
    // check for new, empty note
    userNoteSet.map((eachNote) => {
      if (eachNote.noteSetName === selectedNoteSet.noteSetName) {
        if (
          eachNote.noteSetNote.length === 1 &&
          eachNote.noteSetNote[0].noteText === ""
        ) {
          eachNote.noteSetNote.splice(0, 1);
        }
      }
    });
    // add new note
    userNoteSet.map((eachNote, indentationLevel) => {
      if (eachNote.noteSetName === selectedNoteSet.noteSetName) {
        eachNote.noteSetNote.push({
          noteText: noteToAdd,
          noteTextId: 7,
          indentation: indentationLevel,
        });
        /// also update the selected one
        setSelectedNoteSet({
          noteSetId: eachNote.noteSetId,
          noteSetName: eachNote.noteSetName,
          noteSetNote: eachNote.noteSetNote,
        });
      }
    });
    // update selected note set
  }
  ///
  const initialContextState = {
    noteSet: userNoteSet,
    numberOfNotes: userNoteSet.length,
    currentlySelectedNoteSet: selectedNoteSet,
    setCurrentlySelectedNoteSet: changeSelectedNoteSet,
    addUserNote: addNewUserNote,
    currentViewMode,
    setCurrentViewMode,
    addNewNoteToCurrentSet,
  };
  ///
  return (
    <NoteAppContext.Provider value={initialContextState}>
      {children}
    </NoteAppContext.Provider>
  );
};

export default NoteAppContextProvider;
