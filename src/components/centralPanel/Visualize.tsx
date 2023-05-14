import React, { useContext, useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
///
import { Row, Col } from "react-bootstrap";
///
import { NoteAppContext } from "../../store/notes_context";
import {NoteSetInterface} from "../../data/interfaces"
///
import ViewNotesAsList from "../common/ViewNotesAsList";

export default function Visualize(): JSX.Element {
    const [visualizationWidth, setVisualizationWidth] = useState(0);
    const [visualizationHeight, setVisualizationHeight] = useState(0);
  const noteCtx = useContext(NoteAppContext);
  const currentNode: NoteSetInterface =
    noteCtx.currentlySelectedNoteSet as NoteSetInterface;
  ///
  useEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const viewportHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      const visualizationWidthPercentage = 50; // Adjust as needed
      const visualizationHeightPercentage = 75; // Adjust as needed

      const visualizationWidthValue = Math.floor(
        (viewportWidth * visualizationWidthPercentage) / 100
      );
      const visualizationHeightValue = Math.floor(
        (viewportHeight * visualizationHeightPercentage) / 100
      );

      setVisualizationWidth(visualizationWidthValue);
      setVisualizationHeight(visualizationHeightValue);
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  ///
  return (
    <>
      <div></div>
      <div
        style={{
          width: `${visualizationWidth}px`,
          height: `${visualizationHeight}px`,
        }}
      >
        <br />
        <h4> Current note set: {currentNode.noteSetName}</h4>
        <br />
        <ViewNotesAsList viewIndent={true} />
      </div>
      <div></div>
      <br />
    </>
  );
}
