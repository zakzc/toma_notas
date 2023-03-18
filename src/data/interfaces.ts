export interface NoteInterface {
  noteText: string;
  textLevel: number;
  noteTextId: number;
  indentedFrom: null | number;
}

export interface NoteSetInterface {
  noteSetId: number;
  noteSetName: string;
  noteSetNote: NoteInterface[];
}

export interface NoteContextInterface {
  noteSet: NoteSetInterface[];
  numberOfNotes: number;
  currentlySelectedNoteSet: NoteSetInterface | {};
  setCurrentlySelectedNoteSet: (noteSetToSelect: NoteSetInterface) => void;
  currentViewMode: number;
  // addNewNote: () => {};
  // removeNote: () => {};
}
