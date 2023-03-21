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
  currentlySelectedNoteSet: NoteSetInterface | {};
  setCurrentlySelectedNoteSet: (noteSetToSelect: NoteSetInterface) => void;
  currentViewMode: number;
  setCurrentViewMode: React.Dispatch<number>;
  // addNewNote: () => {};
  // removeNote: () => {};
}
