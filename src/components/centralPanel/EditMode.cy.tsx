import React from 'react'
import EditMode from './EditMode'

describe('<EditMode />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EditMode />)
  })
})