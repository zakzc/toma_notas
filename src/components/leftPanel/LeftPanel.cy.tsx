import React from 'react'
import LeftPanel from './LeftPanel'
import MockRouter from "../../../cypress/utils/mockRouter";

describe('<LeftPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MockRouter>
        <LeftPanel isOpenLeft={false} setIsOpenLeft={function (_value: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        } } />
      </MockRouter>
    );
  })
})