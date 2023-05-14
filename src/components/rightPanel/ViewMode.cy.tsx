import React from 'react'
import ViewMode from './ViewMode'

describe('<ViewMode />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ViewMode isOpenRight={false} setIsOpenRight={function (_value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.')
    } } />)
  })
})