import React, { useState, useContext } from "react";
//
import { NoteAppContext } from "../../store/notes_context";
///
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
///
import Indent from "../svg/Indent";
import Unindent from "../svg/Unindent";
import Check from "../svg/Check";
// import styles from "../../Styles/LogInPageStyle.css";

interface TextAreaProps {
  visualizationMode?: number;
}

export default function TextArea(props: TextAreaProps): JSX.Element {
  const [inputText, setInputText] = useState<string>("");
  const noteCtx = useContext(NoteAppContext);
  console.log("Text ", props.visualizationMode);
  ///
  const [currentIndentationLevel, setCurrentIndentationLevel] =
    useState<string>(noteCtx.getCurrentIndentationLevel());
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
    let parts = currentIndentationLevel.split(".");
    parts = parts.slice(0, -1);
    let lastNumber = parts[parts.length - 1];
    let updatedLastNumber = parseInt(lastNumber, 10) + 1;
    let baseNumber = currentIndentationLevel.slice(0, -3);
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
    if (props.visualizationMode === 1) {
      if (inputText !== "") {
        setNewLevel();
        // @ts-ignore
        noteCtx.addNewNoteToCurrentSet(inputText, currentIndentationLevel);
        setInputText("");
      }
    } else if (props.visualizationMode === 3) {
      console.log("Send to Edit function");
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
                rows={props.visualizationMode === 1 ? 40 : 10}
                cols={props.visualizationMode === 1 ? 5 : 3}
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
                Current: {noteCtx.getCurrentIndentationLevel()}
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
