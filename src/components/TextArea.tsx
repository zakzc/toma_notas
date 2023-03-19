import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
///
import { Container, Row, Col, Button } from "react-bootstrap";
//
import Indent from "./svg/Indent";
import Unindent from "./svg/Unindent";
import Check from "./svg/Check";
// import styles from "../../Styles/LogInPageStyle.css";

export default function TextArea(): JSX.Element {
  const [inputText, setInputText] = useState("");
  // const [indent, setIndent] = useState("0");
  // const { t } = useTranslation();
  console.log("Input: ", inputText);

  const confirmNoteEntry = () => {
    const textToInput = inputText
    setInputText("")
    console.log(textToInput)
  };

  const setIndentationLevel = (level) => {
if (level === true) {
  /// add indentation
  console.log("plus")
} else {
  // remove indentation
  console.log("minus")
}
  }

  const IndentationArea = () => (
    <Row>
      <Col>
        <Button variant="flat" size="lg" onClick={() => setIndentationLevel(true)}>
          <Unindent />
        </Button>
      </Col>
      <Col>
        <Button variant="flat" size="lg" onClick={() => setIndentationLevel(false)}>
          <Indent />
        </Button>
      </Col>
      <Col>
        <Button variant="flat" size="lg" onClick={() => confirmNoteEntry()}>
          <Check />
        </Button>
      </Col>
    </Row>
  );

  return (
    <Container>
      <br />
      <Row>
        <Col>
          <textarea
            name="Text Input"
            rows={window.innerHeight * 0.03}
            cols={window.innerWidth * 0.05}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Col>
      </Row>
      <br />
      <IndentationArea />
    </Container>
  );
}
