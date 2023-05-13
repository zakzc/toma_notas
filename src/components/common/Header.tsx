import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
///
import { NoteAppContext } from "../../store/notes_context";
///
import { Container, Row, Col, ToggleButton } from "react-bootstrap";
import PenIcon from "../svg/PenIcon";
import SeeIcon from "../svg/SeeIcon";
import BigEraser from "../svg/BigEraser";
import Sync from "../svg/Sync";
import Download from "../svg/Download";

const Header = () => {
  const {
    userIsLoggedIn,
    errorMessage,
    setErrorMessage,
    currentVisualizationMode,
    setCurrentVisualizationMode,
    noteSets,
    userEmail,
  } = useContext(NoteAppContext);
  const router = useRouter();
  const [userMessage, setUserMessage] = useState(errorMessage);
  ///

  async function syncDataWithDB() {
    if (userIsLoggedIn === false) {
      router.push("/logInSignUp");
    } else {
      const requestData = {
        email: userEmail,
        password: "",
        requestType: "SyncData",
        userData: noteSets,
      };
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        const data = await response.json();
        if (
          data.success &&
          data.success === true &&
          data.processed &&
          data.processed === true
        ) {
          setUserMessage("Success on sync");
        } else {
          setUserMessage("Error on sync process");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Error occurred while syncing data.");
      }
    }
  }

   const handleDownload = () => {
     const jsonDataStr = JSON.stringify(noteSets, null, 2);
     const blob = new Blob([jsonDataStr], { type: "application/json" });
     const url = URL.createObjectURL(blob);
     const link = document.createElement("a");
     link.href = url;
     link.download = "data.json";
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
     URL.revokeObjectURL(url);
   };

  const DocumentVisualizationTools = () => (
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

  const DocumentManagementTools = () => (
    <div className="centerPageStyle">
      <br />
      <ToggleButton
        key={1}
        variant="flat"
        value="write"
        type="radio"
        size="lg"
        onClick={handleDownload}
      >
        <Download />
      </ToggleButton>
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
    <Container fluid>
    <Row>
      <Col>
        <br />
        <DocumentVisualizationTools />
      </Col>
      <Col>
        <br />
        {userMessage === "" ? <></> : userMessage}
      </Col>
      <Col>
        <DocumentManagementTools />
      </Col>
    </Row>
    </Container>
  );
};

export default Header;
