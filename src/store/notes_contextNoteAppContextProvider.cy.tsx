import React from 'react'
import NoteAppContextProvider from './notes_context'

describe('<NoteAppContextProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NoteAppContextProvider />)
  })
})