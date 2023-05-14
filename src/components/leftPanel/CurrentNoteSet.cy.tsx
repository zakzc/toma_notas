import React from 'react'
import CurrentNoteSet from './CurrentNoteSet'

describe('<CurrentNoteSet />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CurrentNoteSet />)
  })
})