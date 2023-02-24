import React from "react";
import { useTranslation } from "react-i18next";

import styles from "../Styles/rightPanelStyle.module.css";

export default function RightPanel(): JSX.Element {
  const { t } = useTranslation();
  const myViewingOptions = [
    "simpleView",
    "numberedView",
    "levelView",
    "cornelView",
    "flashcardsView",
  ];
  return (
    <div className={styles.rightPanelStyle}>
      <h1>{t("view")}</h1>
      <ul>
        {myViewingOptions.map((v, i) => (
          <li key={i}>{t(v)}</li>
        ))}
      </ul>
    </div>
  );
}
