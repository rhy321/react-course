import { HomePage } from './pages/HomePage'
import { Routes, Route } from 'react-router'
import { OrdersPage } from './pages/Orders'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { TrackingPage } from './pages/Tracking'
import {ErrorPage} from './pages/ErrorPage'
import './App.css'
import { useEffect } from 'react'
import {useState } from 'react'
import axios from 'axios'

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
    });
  }, [])
  

  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />}></Route> */}
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
      <Route path="orders" element={ <OrdersPage />}/>
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={< ErrorPage/>}/>
    </Routes>
  )
}

export default App
