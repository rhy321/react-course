import { HomePage } from './pages/HomePage'
import { Routes, Route } from 'react-router'
import { OrdersPage } from './pages/Orders'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { TrackingPage } from './pages/Tracking'
import {ErrorPage} from './pages/ErrorPage'
import './App.css'

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />}></Route> */}
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage/>} />
      <Route path="orders" element={ <OrdersPage />}/>
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={< ErrorPage/>}/>
    </Routes>
  )
}

export default App
