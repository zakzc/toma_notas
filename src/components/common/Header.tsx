import React, { useContext } from "react";
import { useRouter } from "next/router";
///
import { NoteAppContext } from "../../store/notes_context";
///
import { Row, Col, ToggleButton } from "react-bootstrap";
import PenIcon from "../svg/PenIcon";
import SeeIcon from "../svg/SeeIcon";
import Sync from "../svg/Sync";

interface HeaderInterface {
  appMode: boolean;
  setAppMode: React.Dispatch<boolean>;
}

const Header = (props: HeaderInterface) => {
  const { userIsLoggedIn, noteSets } = useContext(NoteAppContext);
  const router = useRouter();
  ///
  function syncDataWithDB() {
    console.log("Sync me", userIsLoggedIn, noteSets);
    if (userIsLoggedIn === false) {
      router.push("/logInSignUp");
    }
  }

  const WriteViewSwitch = () => (
    <div className="centerPageStyle">
      <ToggleButton
        key={1}
        variant="flat"
        value="write"
        checked={props.appMode === true}
        type="radio"
        size="lg"
        onClick={() => props.setAppMode(true)}
      >
        <SeeIcon />
      </ToggleButton>
      <ToggleButton
        key={2}
        variant="flat"
        value="read"
        name="radio"
        size="lg"
        checked={props.appMode === false}
        type="radio"
        onClick={() => props.setAppMode(false)}
      >
        <PenIcon />
      </ToggleButton>
    </div>
  );

  const SyncDataBase = () => (
    <div className="centerPageStyle">
      <br />
      <ToggleButton
        key={1}
        variant="flat"
        value="write"
        checked={props.appMode === true}
        type="radio"
        size="lg"
        onClick={syncDataWithDB}
      >
        <Sync />
      </ToggleButton>
    </div>
  );

  return (
    <Row>
      <Col></Col>
      <Col>
        <br />
        <WriteViewSwitch />
      </Col>
      <Col>
        <SyncDataBase />
      </Col>
    </Row>
  );
};

export default Header;
