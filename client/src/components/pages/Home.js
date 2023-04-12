import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';

const Home = () => {
  return (
    <div className='grid-2'>
      <div className=''>
        
        <h1>Contact Form</h1>
        <ContactForm/>
      </div>
      <div className=''>
        <Contacts />
      </div>
    </div>
  )
}

export default Home