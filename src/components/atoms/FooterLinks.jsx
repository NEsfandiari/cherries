import React, { Component } from 'react'
import Styled from 'styled-components'
import { Link } from 'gatsby'

const Container = Styled.div`
display: flex;
flex-basis: 50%;
flex-direction: row;
align-items: center;
justify-content: center;
.list-items {
  text-decoration: none;
  color: white;
}
.list {
  list-style-type: none;
  padding-right: 1rem;
}
`
class FooterLinks extends Component {
  render() {
    console.log('what are the footer links props', this.props)
    const links = this.props.linkData.map(d => (
      <li>
        <Link className="list-items" to={d.content[1].data.uri}>
          {d.content[1].content[0].value}
        </Link>
      </li>
    ))
    console.log('what do links look like', links)
    return (
      <Container>
        <div>
          <ul className="list">{links}</ul>
        </div>
      </Container>
    )
  }
}

export default FooterLinks
