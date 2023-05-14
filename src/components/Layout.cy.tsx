import React from 'react'
import Layout from './Layout'
import MockRouter from "../../cypress/utils/mockRouter"

describe('<Layout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MockRouter>
        <Layout />
      </MockRouter>
    );
  })
})