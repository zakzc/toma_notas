import React, { createContext, useState } from "react";
///
import dummyDataForTest from "../data/dummyDataForTest.json";
import { NoteContextInterface, NoteSetInterface } from "../data/interfaces";

export const NoteAppContext = createContext<NoteContextInterface>({
  noteSet: [],
  numberOfNotes: 0,
  currentlySelectedNoteSet: {},
  setCurrentlySelectedNoteSet: () => {},
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
  ///
  const initialContextState = {
    noteSet: userNoteSet,
    numberOfNotes: userNoteSet.length,
    currentlySelectedNoteSet: selectedNoteSet,
    setCurrentlySelectedNoteSet: changeSelectedNoteSet,
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
