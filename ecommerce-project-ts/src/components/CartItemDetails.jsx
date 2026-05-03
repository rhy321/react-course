import axios from 'axios';
import { formatMoney } from '../utils/money.js';
import { useState } from 'react';

export function CartItemDetails({ cartItem, deleteCartItem, loadCart }) {

  const [update, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateCartQuantity = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(quantity)
    })
    await loadCart();
  }

  const handleEventInput = (event) => {
    if (event.key === 'Escape') {
      setQuantity(cartItem.quantity)
      setUpdate(false);
    }
    else if (event.key === 'Enter') {
      updateCartQuantity();
      setUpdate(false);
    }
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {update ? (<input
              className='update-input'
              type="text"
              value={quantity}
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
              onKeyDown={handleEventInput}
            />) :
              <span className="quantity-label">
                {` ${cartItem.quantity}`}</span>
            }
          </span>
          <span className="update-quantity-link link-primary"
            onClick={() => {
              if (update === true) {
                updateCartQuantity();
                setUpdate(false)
              }
              else {
                setUpdate(true)
              }
            }}>
            {update ? 'Save' : 'Update'}
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}