import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(()=>{
    authContext.loadUser();
    //eslint-disable-next-line
  },[])
  return (
    <div className='grid-2'>
      <div className=''>
        
        <h1>Contact Form</h1>
        <ContactForm/>
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home