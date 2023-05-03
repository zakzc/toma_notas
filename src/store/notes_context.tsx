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
  userIsLoggedIn: false,
  setUserIsLoggedIn: () => {},
  editNoteInCurrentSet: () => {},
  deleteNoteFromCurrentSet: () => {},
});

const NoteAppContextProvider: React.FC<Props> = ({ children }) => {
  const [userNoteSet, setUserNoteSet] =
    useState<NoteSetInterface[]>(dummyDataForTest);
  const [selectedNoteSet, setSelectedNoteSet] = useState<NoteSetInterface>(
    userNoteSet[0]
  );
  const [currentViewMode, setCurrentViewMode] = useState<number>(0);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

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
  }

  function getCurrentIndentationLevel(): string {
    const highIndent = selectedNoteSet.noteSetNote.map((i) => i.indentation);
    return highIndent[highIndent.length - 1];
  }

function deleteNoteFromCurrentSet(noteToDelete: string): void {
  const updatedNoteSet = userNoteSet.map((eachNote) => {
    if (eachNote.noteSetName === selectedNoteSet.noteSetName) {
      const updatedNoteSetNote = eachNote.noteSetNote.filter(
        (note) => note.noteTextId !== noteToDelete
      );
      return {
        ...eachNote,
        noteSetNote: updatedNoteSetNote,
      };
    } else {
      return eachNote;
    }
  });
  setUserNoteSet(updatedNoteSet);
}

function editNoteInCurrentSet(
  noteId: string,
  newNoteText: string,
  newIndentation: string
): void {
  const updatedNoteSet = userNoteSet.map((eachNote) => {
    if (eachNote.noteSetName === selectedNoteSet.noteSetName) {
      const updatedNoteSetNote = eachNote.noteSetNote.map((note) => {
        if (note.noteTextId === noteId) {
          return {
            ...note,
            noteText: newNoteText,
            indentation: newIndentation,
          };
        } else {
          return note;
        }
      });
      return {
        ...eachNote,
        noteSetNote: updatedNoteSetNote,
      };
    } else {
      return eachNote;
    }
  });
  setUserNoteSet(updatedNoteSet);
}



  const initialContextState: NoteContextInterface = {
    noteSets: userNoteSet,
    numberOfNotes: userNoteSet.length,
    currentlySelectedNoteSet: selectedNoteSet,
    setCurrentlySelectedNoteSet: changeSelectedNoteSet,
    addUserNote: addNewUserNote,
    currentViewMode,
    setCurrentViewMode,
    addNewNoteToCurrentSet,
    getCurrentIndentationLevel,
    userIsLoggedIn,
    setUserIsLoggedIn,
    editNoteInCurrentSet,
    deleteNoteFromCurrentSet,
  };

  return (
    <NoteAppContext.Provider value={initialContextState}>
      {children}
    </NoteAppContext.Provider>
  );
};

export default NoteAppContextProvider;
