import React, { useContext, useState } from "react";
///
import { NoteAppContext } from "../../store/notes_context";
import { NoteInterface } from "../../data/interfaces";
//
import { Button, Row, Col, Table } from "react-bootstrap";
//
import Garbage from "../svg/Garbage";
import Eraser from "../svg/SmallEraser";
import Flip from "../svg/Flip";

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
  const [seeNotesAsCornel, setSeeNotesAsCornel] = useState(false);
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
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
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
        return letters[Number(num) - 1];
      }

      // Otherwise, use the corresponding roman numeral from the array
      return romanNumerals[Number(num) - 1];
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
        // note as flashcards
        setSeeNotesAsFlashcards(true);
        indentStyle = flashCards(indent);
        break;
      case 5:
        // note as Cornel
        setSeeNotesAsCornel(true);
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
    ///
    interface FlashCardVisualizationProps {
      indentationStyle: string;
      text: string;
    }
    const FlashcardVisualization = (props: FlashCardVisualizationProps) => {
      const [showText, setShowText] = useState(false);

      const handleClickFlashcard = () => {
        setShowText(!showText);
      };

      const textArr = props.text.split("\n");
      const textToShow = textArr.filter(
        (text) => text.startsWith("1.") || !text.startsWith(".")
      );

      return (
        <>
          {props.indentationStyle === "0." ? props.text : ""}
          <br />
          {props.indentationStyle === "1." ? (
            <>
              <Button variant="flat" size="sm" onClick={handleClickFlashcard}>
                <Flip />
              </Button>
              <br />
              {showText && textToShow.join("\n")}
            </>
          ) : (
            ""
          )}
        </>
      );
    };
    ///
    const NoteVisualizationStyle = () => {
      // Flashcard visualization
      if (seeNotesAsFlashcards === true) {
        return (
          <FlashcardVisualization
            indentationStyle={indentationStyle}
            text={props.notes.noteText}
          />
        );
      }
      // Other visualizations (flat, numbered, leveled)
      return (
        <>
          {" "}
          <p>
            {indentation}
            {indentationStyle}
            {"  "}
            {props.notes.noteText}
          </p>
        </>
      );
    };
    ///
    return (
      <>
        <NoteVisualizationStyle />
      </>
    );
  };
  ///
  const CornelVisualization = () => {
    const currentNoteSet = currentlySelectedNoteSet.noteSetNote;
    const [isDataVisible, setIsDataVisible] = useState(false)
    console.log("current is: ", currentlySelectedNoteSet);
    const tableData = currentNoteSet.filter(
      (item) => item.indentation.length === 2
    );
///
  const handleClick = () => {
    // toggle between note visible and not visible
    setIsDataVisible(!isDataVisible)
  };
///
    return (
      <Table variant="flat">
        <thead>
          <tr>
            <th>Clue</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.indentation}>
              <td>
                {" "}
                <Button variant="flat" onClick={handleClick}>
                  {item.noteText}
                </Button>
              </td>
              <td></td>
            </tr>
          ))}
          {currentNoteSet.map((item) => {
            if (item.indentation.length !== 2) {
              return (
                <tr key={item.indentation}>
                  <td></td>
                  <td>{isDataVisible ? item.noteText : ""}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </Table>
    );
  };
  ///
  function eraseNote(id: string) {
    deleteNoteFromCurrentSet(id);
    // TODO: makes this bellow only if id = noteToEdit.id
    // setNoteToEdit('');
  }

  function editNote(thisNoteToEdit: NoteInterface) {
    setCurrentVisualizationMode(3);
    setNoteToEdit(thisNoteToEdit);
  }

  const NoteSetVisualizationModes = () => (
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
  const NoteVisualization = () => {
    if (seeNotesAsCornel === true) {
      return <CornelVisualization />;
    } else {
      return <NoteSetVisualizationModes />;
    }
  };
  ///
  return <NoteVisualization />;
}
