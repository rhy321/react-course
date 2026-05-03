import { Header } from '../components/header';
import './ErrorPage.css';

export function ErrorPage({cart}){
  return(
    <>
      <Header cart={cart}/>
      <p className='error-msg'>404: Page Not Found</p>
    </>
  );
}