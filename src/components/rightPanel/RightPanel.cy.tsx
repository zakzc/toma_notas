import React from 'react'
import RightPanel from './RightPanel'

describe('<RightPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RightPanel isOpenRight={false} setIsOpenRight={function (_value: boolean): void {
      throw new Error('Function not implemented.')
    } } />)
  })
})