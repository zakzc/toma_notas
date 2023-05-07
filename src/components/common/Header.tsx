import React, { useContext } from "react";
import { useRouter } from "next/router";
///
import { NoteAppContext } from "../../store/notes_context";
///
import { Row, Col, ToggleButton } from "react-bootstrap";
import PenIcon from "../svg/PenIcon";
import SeeIcon from "../svg/SeeIcon";
import BigEraser from "../svg/BigEraser"
import Sync from "../svg/Sync";


const Header = () => {
  const { userIsLoggedIn, errorMessage, currentVisualizationMode, setCurrentVisualizationMode } = useContext(NoteAppContext);
  const router = useRouter();
  ///
  function syncDataWithDB() {
    // console.log("Sync me", userIsLoggedIn, noteSets);
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
        checked={currentVisualizationMode === 2}
        type="radio"
        size="lg"
        onClick={() => setCurrentVisualizationMode(2)}
      >
        <SeeIcon />
      </ToggleButton>
      <ToggleButton
        key={2}
        variant="flat"
        value="read"
        name="radio"
        size="lg"
        checked={currentVisualizationMode === 1}
        type="radio"
        onClick={() => setCurrentVisualizationMode(1)}
      >
        <PenIcon />
      </ToggleButton>
      <ToggleButton
        key={3}
        variant="flat"
        value="read"
        name="radio"
        size="lg"
        checked={currentVisualizationMode === 3}
        type="radio"
        onClick={() => setCurrentVisualizationMode(3)}
      >
        <BigEraser />
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
      <Col>
        <br />
        <WriteViewSwitch />
      </Col>
      <Col>
        <br />
        {errorMessage === "" ? <></> : errorMessage}
      </Col>
      <Col>
        <SyncDataBase />
      </Col>
    </Row>
  );
};

export default Header;
