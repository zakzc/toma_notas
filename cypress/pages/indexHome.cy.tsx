import React from "react";
import Home from "../../src/pages/index";
import MockRouter from "../utils/mockRouter";

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
