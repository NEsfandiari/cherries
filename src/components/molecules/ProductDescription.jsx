import React, { Component } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import {
  StyledHr,
  StyledButton,
  QuantityAdjustButton,
  ProductDetail,
} from '../atoms'

const Container = styled.div`
  flex-basis: 45%;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .order-type {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 6rem;
    div {
      padding: 1rem;
      display: flex;
      align-items: center;
    }
    input {
      appearance: none;
      cursor: pointer;
      width: 26px;
      height: 26px;
      border: 1px solid #e20031;
      border-radius: 100%;
      background: #fff;
      :checked {
        background: #e20031;
      }
      :focus {
        outline: none;
      }
    }
    label {
      margin: 1rem;
      b {
        margin-left: 1rem;
      }
    }
  }

  .purchase {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    @media (max-width: 420px) {
      flex-direction: column;
    }
  }
  .price {
    font-size: 0.9rem;
    text-align: center;
    padding: 0.5rem;
    margin: 0;
    color: #ff009a;
    height: 2.5rem;
    width: 5rem;
  }
  h1 {
    white-space: nowrap;
    overflow: visible;
    width: 23rem;
  }

  @media (max-width: 420px) {
    padding: 0rem;
    hr {
      margin-left: 0;
      margin-right: 0;
    }
  }
`

class ProductDescription extends Component {
  state = {
    quantity: 1,
    price: this.props.price,
    status: 'ADD TO BAG',
  }

  handleStatus = e => {
    this.setState({ status: e.target.name })
  }
  handleAdjust = e => {
    let newQuantity
    if (e.target.className === 'add') {
      newQuantity = this.state.quantity + 1
      this.setState({ quantity: newQuantity })
      this.handlePrice(newQuantity)
    } else {
      if (this.state.quantity > 1) {
        newQuantity = this.state.quantity - 1
        this.setState({ quantity: newQuantity })
        this.handlePrice(newQuantity)
      }
    }
  }
  handlePrice = quantity => {
    const newPrice = quantity * this.props.price
    this.setState({
      price: newPrice.toFixed(2),
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.state.status === 'ADD TO BAG') {
      this.props.handleCart(
        'add',
        this.props.title,
        this.props.price,
        parseInt(this.state.quantity),
        this.props.images[0],
        this.props.sku
      )
      console.log('item added')
      this.setState({ status: 'ADDED!' })
    } else {
      navigate('/subscribe')
    }
  }
  render() {
    const productCopy = this.props.productCopy.map((statement, i) => {
      if (statement.content.length === 1)
        return <p key={i}>{statement.content[0].value}</p>
      else {
        // Turn Special marks into subsequent html modifiers
        let fullClause = []
        statement.content.forEach(clause => {
          if (clause.marks.length > 0) {
            if (clause.marks[0].type === 'bold')
              fullClause.push(<b>{clause.value}</b>)
          } else fullClause.push(clause.value)
        })
        return <p key={i}>{fullClause}</p>
      }
    })
    const opacity = this.state.status === 'SUBSCRIBE' ? 0.3 : 1
    return (
      <Container>
        <h1>{this.props.title}</h1>
        {productCopy}
        <StyledHr width={'100%'} margin={'.8rem'} />
        <div className="order-type">
          <div>
            <input
              type="radio"
              name="ADD TO BAG"
              onClick={this.handleStatus}
              checked={this.state.status == 'ADD TO BAG' ? true : false}
            />
            <label for="ADD TO BAG">
              One-Time Purchase:
              <b>${this.state.price}</b>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="SUBSCRIBE"
              onClick={this.handleStatus}
              checked={this.state.status == 'SUBSCRIBE' ? true : false}
            />
            <label for="SUBSCRIBE">
              Subscribe and Save:
              <b>$10/mo</b>
            </label>
          </div>
        </div>
        <form className="purchase" onSubmit={this.handleSubmit}>
          <QuantityAdjustButton
            quantity={this.state.quantity}
            handleAdjust={this.handleAdjust}
            id={''}
            color={'#E20031'}
            height={'2.5rem'}
            width={'3rem'}
            opacity={opacity}
          />
          <StyledButton
            height={'2.5rem'}
            width={'18rem'}
            fontSize={'.65rem'}
            disabled={this.state.oneTimePurchase === 'oneTimePurchase' && false}
          >
            <b>{this.state.status}</b>
          </StyledButton>
        </form>
        <ProductDetail details={this.props.details} />
      </Container>
    )
  }
}

export default ProductDescription
