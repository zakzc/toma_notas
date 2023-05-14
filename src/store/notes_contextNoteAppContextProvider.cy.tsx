import React from 'react'
import NoteAppContextProvider from './notes_context'

describe('<NoteAppContextProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line react/no-children-prop
    cy.mount(<NoteAppContextProvider children={undefined} />)
  })
})