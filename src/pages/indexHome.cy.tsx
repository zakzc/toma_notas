import React from "react";
import Home from "./index";
import MockRouter from "../../cypress/utils/mockRouter";

describe("<Home />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MockRouter>
        <Home />
      </MockRouter>
    );
  });
});
