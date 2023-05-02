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

interface EditNoteInCurrentSetArgs {
  noteId: string;
  newNoteText: string;
  newIndentation: string;
}


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
  userIsLoggedIn: boolean;
  setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  editNoteInCurrentSet: (args: EditNoteInCurrentSetArgs) => void;
  deleteNoteFromCurrentSet: (noteTextId: string) => void;
}
