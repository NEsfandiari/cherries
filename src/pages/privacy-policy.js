import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { MainLayout } from '../components/layouts'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media (max-width: 420px) {
    padding: 1rem;
  }
`
class PrivacyPolicy extends Component {
  render() {
    const policies = this.props.data.contentfulSupportPage.copy.content.map(
      (policy, i) => <p key={i}>{policy.content[0].value}</p>
    )
    return (
      <MainLayout>
        <Container>{policies}</Container>
      </MainLayout>
    )
  }
}
export const query = graphql`
  {
    contentfulSupportPage(pageTitle: { eq: "Privacy Policy" }) {
      id
      copy {
        content {
          content {
            value
          }
        }
      }
    }
  }
`
export default PrivacyPolicy
