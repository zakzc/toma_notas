import React, { useState } from "react";
import { useTranslation } from "react-i18next";
///
import { Container, Row, Col } from "react-bootstrap";

// import styles from "../../Styles/LogInPageStyle.css";

export default function TextArea(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const { t } = useTranslation();
  console.log("Input: ", inputText);
  console.log(
    document.documentElement.clientWidth,
    " x ",
    document.documentElement.clientHeight
  );

  return (
    <Container>
      <br />
      <Row>
        <Col>
          <textarea
            name="Text Input"
            rows={window.innerHeight * 0.04}
            cols={window.innerWidth * 0.05}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Col>
      </Row>
    </Container>
  );
}
