import React from "react";
import { useTranslation } from "react-i18next";

export default function Visualise(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("visualise")}</h1>
      <p> No notes to view currently </p>
    </div>
  );
}
