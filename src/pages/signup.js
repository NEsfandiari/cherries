import React, { Component } from 'react'
import styled from 'styled-components'
import { SideNav } from '../components'
import {
  SignupEmailPassword,
  SignupGoogle,
  SignupFacebook,
} from '../components/molecules'
import { NavLink } from '../components/atoms'
import { MainLayout } from '../components/layouts'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: #47525e;
  background-color: #fbe5e9;
  font-family: Lato;
  a {
    text-decoration: none;
  }
  p {
    margin: 0.5rem;
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
const windowGlobal = typeof window !== 'undefined' && window

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: null,
    }
    this.handleError = this.handleError.bind(this)
  }
  componentDidMount() {
    // this.props.resetSidebar()
  }
  handleError(errorMessage) {
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
          <h2>Create Account</h2>
          <p className="errorMessage animated fadeInRight" style={displayError}>
            {this.state.errorMessage}
          </p>
          <SignupEmailPassword handleError={this.handleError} />
          <p>or</p>
          {/* {typeof window !== 'undefined' && process.browser && (
            <React.Fragment>
              <SignupFacebook handleError={this.handleError} />
              <SignupGoogle handleError={this.handleError} />
            </React.Fragment>
          )} */}
          {windowGlobal && (
            <React.Fragment>
              <SignupFacebook handleError={this.handleError} />
              <SignupGoogle handleError={this.handleError} />
            </React.Fragment>
          )}

          <NavLink
            to="/login"
            fontSize=".8rem"
            hovercolor="#00a6f6"
            letterSpacing="0"
          >
            Already have an account? Sign in
          </NavLink>
        </Container>
      </MainLayout>
    )
  }
}

export default Signup
