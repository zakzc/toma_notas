import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "../Styles/entryPageStyle.css";
import "../Styles/rightPanelStyle.css";
import "../Styles/leftPanelStyle.css";
import "../Styles/textAreaStyle.css";
import "../Styles/textWriteStyle.css";
import "../Styles/centerPageStyle.css";
import "../Styles/viewNotesStyle.css";

import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import TextArea from "./TextArea";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Visualise from "./Visualise";

export default function EntryPage(): JSX.Element {
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const [isOpenRight, setIsOpenRight] = useState(false);
  // 0 for Write Mode, 1 for visualise mode
  const [appMode, setAppMode] = useState(0);
  const { t, i18n } = useTranslation();

  const LeftPanelView = () => (
    <>
      <button onClick={() => setIsOpenLeft(!isOpenLeft)}>
        {appMode === 1 ? (
          <div id="arrowLeftPosition">
            {isOpenLeft ? (
              <ArrowBack style={{ height: "50px", width: "50px" }} />
            ) : (
              <ArrowForward style={{ height: "50px", width: "50px" }} />
            )}
          </div>
        ) : (
          <></>
        )}
      </button>
      {isOpenLeft && <LeftPanel />}
    </>
  );

  const RightPanelView = () => (
    <>
      <button onClick={() => setIsOpenRight(!isOpenRight)}>
        {appMode === 1 ? (
          <div id="arrowRightPosition">
            {isOpenRight ? (
              <ArrowForward style={{ height: "50px", width: "50px" }} />
            ) : (
              <ArrowBack style={{ height: "50px", width: "50px" }} />
            )}
          </div>
        ) : (
          <></>
        )}
      </button>
      {isOpenRight && <RightPanel />}
    </>
  );

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const WriteViewSwitch = () => (
    <div className="centerPageStyle">
      {appMode === 0 ? (
        <button onClick={() => setAppMode(1)}>{t("view")}</button>
      ) : (
        <button onClick={() => setAppMode(0)}>{t("write")}</button>
      )}
    </div>
  );

  const ChangeLanguageSwitch = () => (
    <div className="centerPageStyle">
      <button onClick={() => changeLanguage("en")}> EN </button>
      <span> - </span>
      <button onClick={() => changeLanguage("pt")}> PT </button>
    </div>
  );

  const ViewNotesMode = () => (
    <div className="viewNotesStyle">
      <div style={{ display: "table-cell" }}>
        {appMode === 1 ? <LeftPanelView /> : <></>}
      </div>
      <div style={{ display: "table-cell" }}>
        <Visualise />
      </div>
      <div style={{ display: "table-cell" }}>
        {appMode === 1 ? <RightPanelView /> : <></>}
      </div>
    </div>
  );

  const WriteTextMode = () => (
    <div className="textWriteStyle">
      <TextArea />
    </div>
  );

  return (
    <div className="entryPageStyle">
      <WriteViewSwitch />
      {appMode === 0 ? <WriteTextMode /> : <ViewNotesMode />}
      <ChangeLanguageSwitch />
    </div>
  );
}
