import axios from 'axios'
import BuyAgain from "../assets/images/icons/buy-again.png";
import { Fragment } from 'react';
import dayjs from 'dayjs';

export function OrderDetailsGrid({ order, loadCart }) {

  return (
    <>
      <div className="order-details-grid">
        {order.products.map((item) => {

          const addToCart = async () => {
            await axios.post('/api/cart-items', {
              productId: item.productId,
              quantity: 1
            });
            await loadCart();
          }

          return (
            <Fragment key={item.id}>
              <div className="product-image-container">
                <img src={item.product.image} />
              </div>

              <div className="product-details">
                <div className="product-name">
                  {item.product.name}
                </div>
                <div className="product-delivery-date">
                  Arriving on: {dayjs(item.estimatedDeliveryTimeMs).format('MMMM D')}
                </div>
                <div className="product-quantity">
                  Quantity: {item.quantity}
                </div>
                <button className="buy-again-button button-primary">
                  <img className="buy-again-icon" src={BuyAgain} />
                  <span className="buy-again-message"
                    onClick={addToCart}>
                      Add to Cart</span>
                </button>
              </div>

              <div className="product-actions">
                <a href={`/tracking/${order.id}/${item.productId}`}>
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            </Fragment>
          );
        })}

      </div>
    </>
  );
}