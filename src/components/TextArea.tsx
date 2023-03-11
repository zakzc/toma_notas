import React, { useState } from "react";
import { useTranslation } from "react-i18next";
///
import { Container, Row, Col, Button } from "react-bootstrap";
//
import Indent from "./svg/Indent";
import Unindent from "./svg/Unindent";

// import styles from "../../Styles/LogInPageStyle.css";

export default function TextArea(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const [indent, setIndent] = useState(false)
  const [unindent, setUnindent] = useState(false)
  const { t } = useTranslation();
  console.log("Input: ", inputText);

  const IndentationArea = () => (
 <Row>
   <Col>
        <Button
              variant="light"
              onClick={() => setIndent(!indent)}
            ><Unindent /></Button>
   </Col>
   <Col>
        <Button
              variant="light"
              onClick={() => setUnindent(!unindent)}
            ><Indent /></Button>
   </Col>
 </Row>);


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
      <br/>
      <IndentationArea />
    </Container>
  );
}
