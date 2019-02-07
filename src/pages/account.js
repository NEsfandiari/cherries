import React, { Component } from 'react'
import styled from 'styled-components'

import { SideNav, AccountContainer } from '../components'
import { MainLayout } from '../components/layouts'

const Container = styled.div`
  height: 95vh;
  background-color: #fbe5e9;
  position: relative;
  text-align: center;
  display: flex;

  a {
    text-decoration: none;
  }
  animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .errorMessage {
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: #ffa62c;
    color: white;
    font-size: 0.8rem;
  }
  @media (max-width: 420px) {
    margin-top: 1rem;
  }
`

class Account extends Component {
  state = {
    errorMessage: null,
  }
  componentDidMount() {
    // this.props.resetSidebar()
  }
  handleError = errorMessage => {
    this.setState({ errorMessage: errorMessage })
  }
  render() {
    const displayError = {
      display: typeof this.state.errorMessage !== 'string' ? 'none' : 'inherit',
    }

    return (
      <MainLayout>
        <SideNav />
        <Container>
          <AccountContainer />
        </Container>
      </MainLayout>
    )
  }
}

export default Account
