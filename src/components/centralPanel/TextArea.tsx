import React, { useState, useContext } from "react";
// import { useTranslation } from "react-i18next";
///
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
//
import { NoteAppContext } from "../../store/notes_context";
///
import Indent from "../svg/Indent";
import Unindent from "../svg/Unindent";
import Check from "../svg/Check";
// import styles from "../../Styles/LogInPageStyle.css";

export default function TextArea(): JSX.Element {
  const [inputText, setInputText] = useState<string>("");
  const [currentIndentationLevel, setCurrentIndentationLevel] =
    useState<string>("0.");
  const noteCtx = useContext(NoteAppContext);

  const setIndentationLevel = (level: boolean) => {
    if (level === false) {
      /// add indentation
      console.log("plus");
      setCurrentIndentationLevel(currentIndentationLevel + "0.");
    } else {
      // remove indentation
      if (parseInt(currentIndentationLevel.slice(-1), 10) > 0) {
        const lastNum = parseInt(currentIndentationLevel.slice(-2, -1));
        setCurrentIndentationLevel(
          `${currentIndentationLevel.slice(0, -2)}${lastNum - 1}.`
        );
      }
      console.log("minus");
      return;
    }
  };

  function setNewLevel() {
    let parts = currentIndentationLevel.split(".")
    parts = parts.slice(0, -1)
    let lastNumber = parts[parts.length - 1]
    let updatedLastNumber = parseInt(lastNumber, 10) + 1
    let baseNumber = currentIndentationLevel.slice(0, -3)
    let newLevel
    if (baseNumber === "") {
       newLevel = baseNumber + updatedLastNumber.toString() + ".";
    } else {
       newLevel = baseNumber + "." + updatedLastNumber.toString() + "."
    }
    console.log("parts: ", parts, "last: ", lastNumber, "base: ", baseNumber, "now is: ", newLevel)
    setCurrentIndentationLevel(newLevel);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("check");
    setNewLevel();
    noteCtx.addNewNoteToCurrentSet(inputText, currentIndentationLevel);
    setInputText("");
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
                rows={25}
                cols={5}
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
                {currentIndentationLevel}
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
