import React from 'react'
import Header from './Header'
import MockRouter from "../../../cypress/utils/mockRouter"

describe('<Header />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MockRouter>
        <Header />
      </MockRouter>
    );
  })
})