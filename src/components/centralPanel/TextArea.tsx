import React, { useState, useContext, useEffect } from "react";
//
import { NoteAppContext } from "../../store/notes_context";
///
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
///
import Indent from "../svg/Indent";
import Unindent from "../svg/Unindent";
import Check from "../svg/Check";
// import styles from "../../Styles/LogInPageStyle.css";

export default function TextArea(): JSX.Element {
  const [inputText, setInputText] = useState<string>("");
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const {
    editNoteInCurrentSet,
    getCurrentIndentationLevel,
    addNewNoteToCurrentSet,
    currentVisualizationMode,
  } = useContext(NoteAppContext);
  const [currentIndentationLevel, setCurrentIndentationLevel] =
    useState<string>(getCurrentIndentationLevel);
  ///
  useEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const viewportHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      const colsPercentage = 100; // Adjust as needed
      const rowsPercentage = 3; // Adjust as needed

      const colsValue = Math.floor((viewportWidth * colsPercentage) / 100);
      const rowsValue = Math.floor((viewportHeight * rowsPercentage) / 100);

      setCols(colsValue);
      setRows(rowsValue);
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  ///
  const setIndentationLevel = (level: boolean) => {
    if (level === false) {
      /// add indentation
      setCurrentIndentationLevel(currentIndentationLevel + "0.");
    } else {
      // remove indentation
      if (
        currentIndentationLevel.slice(-2) === "0." &&
        currentIndentationLevel.length === 2
      ) {
        setCurrentIndentationLevel("0.");
      } else if (currentIndentationLevel.slice(-2) === "0.") {
        setCurrentIndentationLevel(currentIndentationLevel.slice(0, -2));
      } else {
        let parts = currentIndentationLevel.split(".");
        parts = parts.slice(0, -1);
        let lastNumber = parts[parts.length - 1];
        let updatedLastNumber = parseInt(lastNumber, 10) - 1;
        let baseNumber = currentIndentationLevel.slice(0, -3);
        let newLevel;
        newLevel = baseNumber + "." + updatedLastNumber.toString() + ".";
        setCurrentIndentationLevel(newLevel);
      }
    }
  };

  function setNewLevel() {
    let parts = currentIndentationLevel
      ? currentIndentationLevel.split(".")
      : "0.";
    parts = parts.slice(0, -1);
    let lastNumber = parts[parts.length - 1];
    let updatedLastNumber = parseInt(lastNumber, 10) + 1;
    let baseNumber = currentIndentationLevel
      ? currentIndentationLevel.slice(0, -3)
      : "";
    let newLevel;
    if (baseNumber === "") {
      newLevel = baseNumber + updatedLastNumber.toString() + ".";
    } else {
      newLevel = baseNumber + "." + updatedLastNumber.toString() + ".";
    }
    setCurrentIndentationLevel(newLevel);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentVisualizationMode === 1) {
      // Text area in creation mode
      if (inputText !== "") {
        setNewLevel();
        const valueToSend = {
          noteToAdd: inputText,
          indentationLevel: currentIndentationLevel,
        };
        addNewNoteToCurrentSet(valueToSend);
        setInputText("");
      }
    } else if (currentVisualizationMode === 3) {
      // Text are in Edit more
      editNoteInCurrentSet(inputText, currentIndentationLevel);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  return (
    <Container>
      <br />
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                rows={rows}
                cols={cols}
                as="textarea"
                aria-label="With textarea"
                value={inputText}
                onChange={handleChange}
              />
            </InputGroup>
            <Row>
              <Col>
                <Button
                  variant="flat"
                  size="lg"
                  onClick={() => setIndentationLevel(true)}
                >
                  <Unindent />
                </Button>
              </Col>
              <Col>
                <br />
                Current: {getCurrentIndentationLevel()}
                <br />
                Next: {currentIndentationLevel}
              </Col>
              <Col>
                <Button
                  variant="flat"
                  size="lg"
                  onClick={() => setIndentationLevel(false)}
                >
                  <Indent />
                </Button>
              </Col>
              <Col>
                <Button variant="flat" size="lg" type="submit">
                  <Check />
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <br />
    </Container>
  );
}
