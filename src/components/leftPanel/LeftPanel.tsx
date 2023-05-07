import React, { useContext } from "react";
import { useRouter } from "next/router";
///
import { NoteAppContext } from "../../store/notes_context";
///
import UserNotes from "./UserNotes";
import CurrentNoteSet from "./CurrentNoteSet";
///
import { Row, Col, Button } from "react-bootstrap";
import ArrowLeft from "../svg/ArrowLeft";
import ArrowRight from "../svg/ArrowRight";
import Exit from "../svg/Exit";
import Enter from "../svg/Enter";

interface LeftPanelInterface {
  isOpenLeft: boolean;
  setIsOpenLeft: React.Dispatch<React.SetStateAction<boolean>>;
  appMode: number;
}

export default function LeftPanel(props: LeftPanelInterface): JSX.Element {
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(NoteAppContext);
  const router = useRouter();
  ///
  const OpenCloseSideTabButton = () => (
    <Row>
      {props.isOpenLeft ? (
        <>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button
              variant="flat"
              size="lg"
              onClick={() => props.setIsOpenLeft(!props.isOpenLeft)}
            >
              <ArrowLeft />
            </Button>
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Button
              variant="flat"
              size="lg"
              onClick={() => props.setIsOpenLeft(!props.isOpenLeft)}
            >
              <ArrowRight />
            </Button>
          </Col>
        </>
      )}
    </Row>
  );

  const ExitButton = () => (
    <Row>
      <Col>
        <Button
          variant="flat"
          size="lg"
          onClick={() => {
            setUserIsLoggedIn(false);
            router.push("/logInSignUp");
          }}
        >
          <Exit />
        </Button>
      </Col>
    </Row>
  );

  const EnterButton = () => (
    <Row>
      <Col>
        <Button
          variant="flat"
          size="lg"
          onClick={() => router.push("/logInSignUp")}
        >
          <Enter />
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      <OpenCloseSideTabButton />
      {props.isOpenLeft ? (
        <>
          <CurrentNoteSet />
          <br />
          <br />
          <UserNotes />
          <br />
          <br />
          {userIsLoggedIn === true ? <ExitButton /> : <EnterButton />}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
