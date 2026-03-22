import { Header } from '../components/header';
import './ErrorPage.css';

export function ErrorPage(){
  return(
    <>
    <Header/>
    <p className='error-msg'>404: Page Not Found</p>
    </>
  );
}