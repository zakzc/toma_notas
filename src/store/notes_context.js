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
      noteSetName: "Aramis",
      noteSetNote: [
        {
          noteText: "This is a test note 0",
          textLevel: 0,
          noteTextId: 0,
          indentedFrom: null,
        },
      ],
    },
    {
      noteSetId: 1,
      noteSetName: "Athos",
      noteSetNote: [
        {
          noteText: "This is a test note 1",
          textLevel: 0,
          noteTextId: 0,
          indentedFrom: null,
        },
        {
          noteText: "This is a test note embed level 1",
          textLevel: 1,
          noteTextId: 0,
          indentedFrom: 0,
        },
        {
          noteText: "This is a test note embed level 2",
          textLevel: 2,
          noteTextId: 0,
          indentedFrom: 1,
        },
      ],
    },
    {
      noteSetId: 2,
      noteSetName: "Porthos",
      noteSetNote: [
        {
          noteText: "This is a test note 2",
          textLevel: 0,
          noteTextId: 0,
          indentedFrom: null,
        },
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
    nodeSet: userNoteSet,
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
