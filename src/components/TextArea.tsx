import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
///
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
//
import Indent from "./svg/Indent";
import Unindent from "./svg/Unindent";
import Check from "./svg/Check";
// import styles from "../../Styles/LogInPageStyle.css";

export default function TextArea(): JSX.Element {
  const [inputText, setInputText] = useState<string>("");

  const setIndentationLevel = (level) => {
    if (level === true) {
      /// add indentation
      console.log("plus");
    } else {
      // remove indentation
      console.log("minus");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputText);
    setInputText("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const ButtonsArea = () => (
    <>
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
    </>
  );

  return (
    <Container>
      <br />
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            {/* <label>
              <textarea value={inputText} onChange={handleChange} />
            </label> */}
            <InputGroup>
              <Form.Control
                rows={window.innerHeight * 0.03}
                cols={window.innerWidth * 0.05}
                as="textarea"
                aria-label="With textarea"
                value={inputText}
                onChange={handleChange}
              />
            </InputGroup>
            <ButtonsArea />
          </Form>
        </Col>
      </Row>
      <br />
    </Container>
  );
}
