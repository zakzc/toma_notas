import React from 'react'
import LogInSignUpPage from './LogInSignUpPage'
import MockRouter from '../../../cypress/utils/mockRouter'


describe('<LogInSignUpPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MockRouter>
        <LogInSignUpPage />
      </MockRouter>
    );
  })
})