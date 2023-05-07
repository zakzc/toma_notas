import React, { useContext, useState } from "react";
///
import { NoteAppContext } from "../../store/notes_context";
import { NoteInterface } from "../../data/interfaces";
//
import { Button, Row, Col } from "react-bootstrap";
//
import Garbage from "../svg/Garbage";
import Eraser from "../svg/SmallEraser";

interface ViewNotesInterface {
  viewIndent: boolean;
}

export default function ViewNotesAsList(
  props: ViewNotesInterface
): JSX.Element {
  const {
    currentViewMode,
    currentlySelectedNoteSet,
    deleteNoteFromCurrentSet,
    setNoteToEdit,
    setCurrentVisualizationMode,
  } = useContext(NoteAppContext);
  const currentSet = currentlySelectedNoteSet.noteSetNote;
  const [showIndentation, setShowIndentation] = useState(false);
  const [seeNotesAsFlashcards, setSeeNotesAsFlashcards] = useState(false);
  ///
  function flashCards(indent: string) {
    if (indent.length <= 2) {
      return "0.";
    } else {
      return "1.";
    }
  }
  function getLeveledIndentationStyle(indent: string) {
    // Split the string into an array of numbers
    const numbers = indent.split(".");

    // Define arrays of letters and roman numerals to use
    const letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const romanNumerals = [
      "i",
      "ii",
      "iii",
      "iv",
      "v",
      "vi",
      "vii",
      "viii",
      "ix",
      "x",
      "xi",
      "xii",
      "xiii",
      "xiv",
      "xv",
      "xvi",
      "xvii",
      "xviii",
      "xix",
      "xx",
    ];

    // Map over the numbers and transform them
    const transformed = numbers.map((num, index) => {
      // Convert the number to a string
      let str = num.toString();

      // If this is the first number, leave it as-is
      if (index === 0) {
        return str;
      }

      // If this is the second number, use the corresponding letter from the array
      if (index === 1) {
        return letters[num - 1];
      }

      // Otherwise, use the corresponding roman numeral from the array
      return romanNumerals[num - 1];
    });

    // Join the transformed array back into a string
    return transformed.join(".");
  }

  const getIndentationStyle = (indent: string) => {
    let indentStyle = "";
    switch (currentViewMode) {
      // simple note rendering with indent
      case 0:
        setShowIndentation(true);
        break;
      // note with indent
      case 1:
        setShowIndentation(false);
        break;
      // numbered
      case 2:
        indentStyle += indent;
        break;
      // note with levels
      case 3:
        indentStyle = getLeveledIndentationStyle(indent);
        break;
      case 4:
        setSeeNotesAsFlashcards(true)
        indentStyle = flashCards(indent);
        break;
      default:
        break;
    }
    return indentStyle;
  };
  ///
  interface FlatNotesInterface {
    notes: NoteInterface;
    key: number;
  }
  const FlatNote = (props: FlatNotesInterface) => <p>{props.notes.noteText}</p>;
  //
  interface IndentNotesInterface {
    notes: NoteInterface;
    key: number;
  }
  const IndentedNote = (props: IndentNotesInterface) => {
    let indent = props.notes.indentation;
    const indentationStyle = getIndentationStyle(indent);
    let indentation =
      showIndentation === true ? "" : `\xa0\xa0\xa0\xa0`.repeat(indent.length);
    return (
      <p>
        {indentation}
        {indentationStyle}
        {"  "}
        {props.notes.noteText}
      </p>
    );
  };
  ///
  function eraseNote(id: string) {
    deleteNoteFromCurrentSet(id);
    setNoteToEdit(undefined);
  }

  function editNote(thisNoteToEdit: NoteInterface) {
    setCurrentVisualizationMode(3);
    setNoteToEdit(thisNoteToEdit);
    console.log("Edit this note", thisNoteToEdit);
  }
  ///
  return (
    <>
      {currentSet ? (
        currentSet.map((i: NoteInterface, k: number) => (
          <>
            {props.viewIndent === false ? (
              <Row>
                <Col md="auto">
                  <FlatNote notes={i} key={k} />
                </Col>
                <Col></Col>
                <Col>
                  <Button
                    variant="flat"
                    size="sm"
                    onClick={() => eraseNote(i.noteTextId)}
                  >
                    <Garbage />
                  </Button>
                  <Button variant="flat" size="sm" onClick={() => editNote(i)}>
                    <Eraser />
                  </Button>
                </Col>
              </Row>
            ) : (
              <IndentedNote notes={i} key={k * 1000} />
            )}
          </>
        ))
      ) : (
        <h4> No notes to show </h4>
      )}
    </>
  );
}
