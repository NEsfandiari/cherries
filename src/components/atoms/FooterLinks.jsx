import React, { Component } from 'react'
import Styled from 'styled-components'
import { Link } from 'gatsby'

const Container = Styled.div`
display: flex;
flex-basis: 50%;
align-items: center;
justify-content: center;
width: 100%;
.list-items, a {
  text-decoration: none;
  color: white;
}
li {
  padding-right: 3.6rem;
}
.list {
  width: 90%;
  height: 8rem;
  list-style-type: none;
  padding-top: 1rem;
  padding-right: 1rem;
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
  flex-basis: 50%;
  margin: 0;
}
@media (max-width: 420px) {
  flex-direction: column;
}
`
class FooterLinks extends Component {
  render() {
    const links = this.props.linkData.map((d, index) => (
      <li key={index}>
        {d.title == 'Instagram' ? (
          <a href={d.link} rel="noopener" target="_blank">
            {d.title}
          </a>
        ) : (
          <Link className="list-items" to={d.link}>
            {d.title}
          </Link>
        )}
      </li>
    ))
    return (
      <Container>
        <ul className="list">{links}</ul>
      </Container>
    )
  }
}

export default FooterLinks
