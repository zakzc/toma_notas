import React from "react";
import UserNotes from "./UserNotes";
import MockRouter from "../../../cypress/utils/mockRouter";

describe("<UserNotes />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MockRouter>
        <UserNotes />
      </MockRouter>
    );
  });
});
