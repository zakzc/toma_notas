import { createContext, useState } from "react";

const NotesContext = createContext({
  nodeSet: [],
  addNewNote: () => {},
  removeNote: () => {},
});

export function NotesContextProvider(props) {
  const [userNoteSet, setUserNoteSet] = useState([
    {
      noteSetId: 0,
      noteSetName: new Date(),
      noteSetNote: [
        { noteText: "", textLevel: 0, noteTextId: 0, indentedFrom: 0 },
      ],
    },
  ]);
  ///
  function addNewNoteHandler(newNote) {
    setUserNoteSet((prevState) => {
      prevState.concat(newNote);
    });
  }
  function removeNoteHandler(noteToRemoveId) {
    setUserNoteSet((prevState) => {
      return prevState.filter((i) => i.noteSetId !== noteToRemoveId);
    });
  }
  ///
  const context = {
    setOfNotes: userNoteSet,
    numberOfNotes: userNoteSet.length,
    addNewNote: addNewNoteHandler,
    removeNote: removeNoteHandler,
  };
  return (
    <NotesContext.Provider value={context}>
      {props.children}
    </NotesContext.Provider>
  );
}

export default NotesContext;
