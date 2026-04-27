import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({cart, loadCart}) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  
  useEffect(() => {
    const getHomeData = async () => {
      const url = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(url);
      setProducts(response.data);
    }
    getHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products = {products} loadCart={loadCart}/>
      </div>
    </>
  );
}