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

export interface NoteContextInterface {
  noteSet: NoteSetInterface[];
  numberOfNotes: number;
  currentlySelectedNoteSet: NoteSetInterface;
  setCurrentlySelectedNoteSet: (noteSetToSelect: NoteSetInterface) => void;
  addUserNote: (noteName: string) => void;
  currentViewMode: boolean;
  setCurrentViewMode: React.Dispatch<React.SetStateAction<boolean>>;
  addNewNoteToCurrentSet: (noteToAdd: string, indentationLevel: string) => void;
  getCurrentIndentationLevel: () => string;
  userIsLoggedIn: boolean;
  setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
