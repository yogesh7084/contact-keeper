import React, {Fragment, useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {contacts} = contactContext;
    
  return (
    <Fragment>
        {contacts.map(contact =>(
            <ContactItem key={contact.id} contact ={contact} />
            // <h1>{contact.email}</h1>
        ) )}
        {console.log(contacts)}
    </Fragment>
  );
};

export default Contacts