import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: ${({ color }) => color || ''};
  div {
    cursor: pointer;
  }
  border: 2px solid;
  background-color: white;
  height: ${({ height }) => height || '1.7rem'};
  opacity: ${props => props.opacity};
  transition: 0.3s;
  width: 5rem;
  p {
    margin: 0;
  }
`

class QuantityAdjustButton extends Component {
  state = {}
  render() {
    const { handleAdjust, id, quantity, height, color, opacity } = this.props
    return (
      <Container height={height} color={color} opacity={opacity}>
        <div className="sub" onClick={handleAdjust} data-id={id}>
          -
        </div>
        <p>{quantity}</p>
        <div className="add" onClick={handleAdjust} data-id={id}>
          +
        </div>
      </Container>
    )
  }
}

export default QuantityAdjustButton
