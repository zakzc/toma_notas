import React, { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

import dummyDataForTest from "../data/dummyDataForTest.json";
import {
  NoteContextInterface,
  NoteSetInterface,
  NoteInterface,
} from "../data/interfaces";

interface Props {
  children: React.ReactNode;
}

interface AddNewNoteToCurrentSetArgs {
  noteToAdd: string;
  indentationLevel: string;
}

export const NoteAppContext = createContext<NoteContextInterface>({
  noteSets: [],
  numberOfNotes: 0,
  currentlySelectedNoteSet: {} as NoteSetInterface,
  setCurrentlySelectedNoteSet: () => {},
  addUserNote: () => {},
  currentViewMode: 0,
  setCurrentViewMode: () => {},
  addNewNoteToCurrentSet: () => {},
  getCurrentIndentationLevel: () => "",
  setUserNoteSet: () => {},
  userIsLoggedIn: false,
  setUserIsLoggedIn: () => {},
  editNoteInCurrentSet: () => {},
  deleteNoteFromCurrentSet: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  noteToEdit: undefined,
  setNoteToEdit: () => {},
  currentVisualizationMode: 0,
  setCurrentVisualizationMode: () => {},
  userEmail: "", 
  setUserEmail: () => {},
  syncDataWithDB: () => {}
});

const NoteAppContextProvider: React.FC<Props> = ({ children }) => {
  const [userNoteSet, setUserNoteSet] =
    useState<NoteSetInterface[]>(dummyDataForTest);
  const [selectedNoteSet, setSelectedNoteSet] = useState<NoteSetInterface>(
    userNoteSet[0]
  );
  const [currentViewMode, setCurrentViewMode] = useState<number>(0);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [noteToEdit, setNoteToEdit] = useState(selectedNoteSet.noteSetNote[0]);
  const [currentVisualizationMode, setCurrentVisualizationMode] =
    useState<number>(0);
    const [userEmail, setUserEmail] = useState("");

  function changeSelectedNoteSet(noteSetToSelect: NoteSetInterface): void {
    setSelectedNoteSet(noteSetToSelect);
  }

  function addNewUserNote(noteName: string): void {
    setUserNoteSet([
      ...userNoteSet,
      {
        noteSetId: uuid(),
        noteSetName: noteName,
        noteSetNote: [{ noteText: "", noteTextId: "0", indentation: "0." }],
      },
    ]);
    setSelectedNoteSet({
      noteSetId: uuid(),
      noteSetName: noteName,
      noteSetNote: [],
    });
  }

  function addNewNoteToCurrentSet({
    noteToAdd,
    indentationLevel: indentationLevel,
  }: AddNewNoteToCurrentSetArgs): void {
    if (noteToAdd) {
      const updatedNoteSet = userNoteSet.map((eachNote) => {
        if (eachNote.noteSetName === selectedNoteSet.noteSetName) {
          const newNote: NoteInterface = {
            noteText: noteToAdd,
            noteTextId: uuid(),
            indentation: indentationLevel,
          };
          const updatedNoteSetNote = [...eachNote.noteSetNote, newNote];
          return {
            ...eachNote,
            noteSetNote: updatedNoteSetNote,
          };
        } else {
          return eachNote;
        }
      });

      setUserNoteSet(updatedNoteSet);
      setSelectedNoteSet(
        updatedNoteSet.find(
          (noteSet) => noteSet.noteSetName === selectedNoteSet.noteSetName
        )!
      );
    } else {
      setErrorMessage("Error adding note to current set.");
    }
  }

  function getCurrentIndentationLevel(): string {
    const highIndent = selectedNoteSet.noteSetNote.map((i) => i.indentation);
    if (highIndent !== undefined) {
      return highIndent[highIndent.length - 1];
    }
    return "0.";
  }

  function deleteNoteFromCurrentSet(noteToDelete: string): void {
    const noteSetWithNoteDeleted = selectedNoteSet.noteSetNote.filter(
      (n) => n.noteTextId !== noteToDelete
    );
    // make new note set with note deleted
    const newNoteSet = {
      noteSetId: selectedNoteSet.noteSetId,
      noteSetName: selectedNoteSet.noteSetName,
      noteSetNote: noteSetWithNoteDeleted,
    };
    setSelectedNoteSet(newNoteSet);
    // update the whole user note set
    const newValueForNoteSet = userNoteSet.map((m) => {
      if (m.noteSetId === selectedNoteSet.noteSetId) {
        return newNoteSet;
      } else {
        return m;
      }
    });
    setUserNoteSet(newValueForNoteSet);
  }

  function editNoteInCurrentSet(
    newNoteText: string,
    newIndentation: string
  ): void {
    const updatedNote = {
      noteText: newNoteText,
      noteTextId: noteToEdit.noteTextId,
      indentation: newIndentation,
    };

    const individualNoteUpdated = selectedNoteSet.noteSetNote.map((o) => {
      if (o.noteTextId === selectedNoteSet.noteSetId) {
        return updatedNote;
      } else return o;
    });

    const newSelectedNoteSet = {
      noteSetId: selectedNoteSet.noteSetId,
      noteSetName: selectedNoteSet.noteSetName,
      noteSetNote: individualNoteUpdated,
    };
    // update note set being visualized
    setSelectedNoteSet(newSelectedNoteSet);
    setUserNoteSet([newSelectedNoteSet]);
  }

  async function syncDataWithDB() {
   try {
     // Call MongoDB API to update data with currentData
     await fetch("/api/syncData", {
       method: "PUT",
       body: JSON.stringify(userNoteSet),
       headers: {
         "Content-Type": "application/json",
       },
     });

   } catch (error) {
     console.error("Error on data sync: ", error);
   }
  }

  const initialContextState: NoteContextInterface = {
    noteSets: userNoteSet,
    numberOfNotes: userNoteSet.length,
    currentlySelectedNoteSet: selectedNoteSet,
    setCurrentlySelectedNoteSet: changeSelectedNoteSet,
    addUserNote: addNewUserNote,
    currentViewMode,
    setUserNoteSet,
    setCurrentViewMode,
    addNewNoteToCurrentSet,
    getCurrentIndentationLevel,
    userIsLoggedIn,
    setUserIsLoggedIn,
    editNoteInCurrentSet,
    deleteNoteFromCurrentSet,
    errorMessage,
    setErrorMessage,
    noteToEdit,
    setNoteToEdit,
    currentVisualizationMode,
    setCurrentVisualizationMode,
    userEmail,
    setUserEmail,
    syncDataWithDB,
  };

  return (
    <NoteAppContext.Provider value={initialContextState}>
      {children}
    </NoteAppContext.Provider>
  );
};

export default NoteAppContextProvider;
