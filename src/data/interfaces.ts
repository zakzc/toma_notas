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
  getCurrentIndentationLevel: () => NoteInterface[];
  userIsLoggedIn: boolean;
  setLoggedInUser: () => void;
  setUserIsLoggedOut: () => void;
  getUserIsLoggedIn: () => boolean;
}
