import React from 'react'
import ViewNotesAsList from './ViewNotesAsList'

describe('<ViewNotesAsList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ViewNotesAsList viewIndent={false} />)
  })
})