import React from 'react'
import NoPageFound from './NoPageFound'

describe('<NoPageFound />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NoPageFound />)
  })
})