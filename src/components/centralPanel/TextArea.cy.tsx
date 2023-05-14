import React from 'react'
import TextArea from './TextArea'

describe('<TextArea />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TextArea />)
  })
})