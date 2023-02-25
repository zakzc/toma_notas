import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "../../Styles/LogInPageStyle.css";

export default function TextArea(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const { t } = useTranslation();
  console.log("Input: ", inputText);

  return (
    <div>
      <h2>{t("inputText")}</h2>
      <br />
      <textarea
        name="Text Input"
        rows={30}
        cols={50}
        onChange={(e) => setInputText(e.target.value)}
      />
    </div>
  );
}
