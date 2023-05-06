import React from "react";

export interface NoteInterface {
  noteText: string;
  noteTextId: string;
  indentation: string;
}

export interface NoteSetInterface {
  noteSetId: string;
  noteSetName: string;
  noteSetNote: NoteInterface[];
}

export interface AddNewNoteToCurrentSetArgs {
  noteToAdd: string;
  indentationLevel: string;
}

// interface EditNoteInCurrentSetArgs {
//   noteId: string;
//   newNoteText: string;
//   newIndentation: string;
// }

export interface NoteContextInterface {
  noteSets: NoteSetInterface[];
  numberOfNotes: number;
  currentlySelectedNoteSet: NoteSetInterface;
  setCurrentlySelectedNoteSet: (noteSetToSelect: NoteSetInterface) => void;
  addUserNote: (noteName: string) => void;
  currentViewMode: number;
  setCurrentViewMode: React.Dispatch<React.SetStateAction<number>>;
  addNewNoteToCurrentSet: ({
    noteToAdd,
    indentationLevel,
  }: AddNewNoteToCurrentSetArgs) => void;
  getCurrentIndentationLevel: () => string;
  setUserNoteSet: (userData: NoteSetInterface) => void;
  userIsLoggedIn: boolean;
  setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  editNoteInCurrentSet: (
    noteId: string,
    newNoteText: string,
    newIndentation: string
  ) => void;
  deleteNoteFromCurrentSet: (noteTextId: string) => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}
