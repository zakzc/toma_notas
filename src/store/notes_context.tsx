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
  // currentViewMode: false,
  // setCurrentViewMode: () => {},
});

const NoteAppContextProvider: React.FC = ({ children }) => {
  const [userNoteSet, setUserNoteSet] =
    useState<NoteSetInterface[]>(dummyDataForTest);
  const [selectedNoteSet, setSelectedNoteSet] = useState(userNoteSet[0]);
  // const [currentViewMode, setCurrentViewMode] = useState(false)
  ///
  function changeSelectedNoteSet(noteSetToSelect: NoteSetInterface) {
    setSelectedNoteSet(noteSetToSelect);
  }
  function addNewUserNote(noteName: string) {
    setUserNoteSet([
      ...userNoteSet,
      { noteSetId: 5, noteSetName: noteName, noteSetNote: [] },
    ]);
  }
  ///
  const initialContextState = {
    noteSet: userNoteSet,
    numberOfNotes: userNoteSet.length,
    currentlySelectedNoteSet: selectedNoteSet,
    setCurrentlySelectedNoteSet: changeSelectedNoteSet,
    addUserNote: addNewUserNote,
    // currentViewMode,
    // setCurrentViewMode,
  };
  ///
  return (
    <NoteAppContext.Provider value={initialContextState}>
      {children}
    </NoteAppContext.Provider>
  );
};

export default NoteAppContextProvider;
