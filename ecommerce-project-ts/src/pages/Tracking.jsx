import './tracking.css';
import { Header } from '../../../ecommerce-project-ts/src/components/header';
import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { deliveryProgress } from '../utils/deliveryProgress';
import { DeliveryStatus } from '../../../ecommerce-project-ts/src/components/DeliveryStatus';

export function TrackingPage({cart}) {
  const {orderId, productId} = useParams();
  console.log(orderId);
  console.log(productId);

  const [order, setOrder] = useState(null);

  useEffect(()=>{
    const getOrderData= async()=>{
      const response = await axios.get(`/api/orders/${orderId}?expand=products`)
      setOrder(response.data);
    }
    getOrderData();
  },[orderId]);
  
  if(!order) {return null;}

  const selectedProduct = order.products.find((productOption) => {
      return(productOption.productId === productId);
    }
  );

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

      <Header cart={cart}/>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>
          

          <div className="delivery-date">
            {deliveryProgress({selectedProduct, order}) >= 100 ? 
            'Delivered on ':
            'Arriving on '}
            {dayjs(selectedProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {selectedProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {selectedProduct.quantity}
          </div>

          <img className="product-image" src= {selectedProduct.product.image} />

          <DeliveryStatus deliveryPercent={deliveryProgress({selectedProduct, order})}/>

          <div className="progress-bar-container">
            <div className="progress-bar" 
            style = {{width:`${deliveryProgress({selectedProduct, order})}%`}}>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}