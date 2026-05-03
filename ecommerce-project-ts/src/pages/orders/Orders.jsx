import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '../../components/header';
import './Orders.css';
import {OrdersGrid} from '../../components/OrdersGrid';

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products')
      setOrders(response.data);
      console.log(response);
    }
    getOrdersData();

  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />


      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart}/>
      </div>
    </>
  );
}