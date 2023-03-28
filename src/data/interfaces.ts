export interface NoteInterface {
  noteText: string;
  noteTextId: number;
  indentation: string;
}

export interface NoteSetInterface {
  noteSetId: number;
  noteSetName: string;
  noteSetNote: NoteInterface[];
}

export interface NoteContextInterface {
  noteSet: NoteSetInterface[];
  numberOfNotes: number;
  currentlySelectedNoteSet: NoteSetInterface[];
  setCurrentlySelectedNoteSet: (noteSetToSelect: NoteSetInterface) => void;
  addUserNote: (noteName: string) => void;
  currentViewMode: number;
  setCurrentViewMode: React.Dispatch<number>;
  addNewNoteToCurrentSet: (
    noteToAdd: NoteSetInterface,
    indentationLevel: string
  ) => void;
  getCurrentIndentationLevel: () => string,
  // addNewNote: () => {};
  // removeNote: () => {};
}
