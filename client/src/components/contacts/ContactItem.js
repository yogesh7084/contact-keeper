import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  }

  return (
    <div className='card bg-light'>
      <div className=''>
        <h1 className='text-primary text-left'>{name}{" "}
          <span
            style={{ float: 'right' }}
            className={'badge ' + (type === "professional" ? 'badge-success' : 'badge-primary')}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </h1>
      </div>

      <ul className=''>
        {email && (
          <li>
            <i className='fas fa-envelope-open mr-2'></i>{email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone mr-2'></i>{phone}
          </li>
        )}
      </ul>
      <p className='ml-3'>
        <button className='btn btn-dark btn-sm' onClick={() => { setCurrent(contact); console.log(contact) }}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
      </p>

    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem 