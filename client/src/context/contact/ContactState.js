import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Yogesh S',
                email: 'yogesh@gmail.com',
                phone: '7028444444',
                type: "personal"
            },
            {
                id: 2,
                name: 'Akash S',
                email: 'akash@gmail.com',
                phone: '7666444444',
                type: "personal"
            }, {
                id: 3,
                name: 'Samadhan S',
                email: 'sam@gmail.com',
                phone: '7378457878',
                type: "personal"
            }, {
                id: 4,
                name: 'Ganesh S',
                email: 'ganesh@gmail.com',
                phone: '7666666666',
                type: "professional"
            }
        ],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add Contact 
    const addContact = contact => {
        contact.id = uuid();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    // Delete Contact
    const deleteContact = contact => {
        dispatch({ type: DELETE_CONTACT, payload: contact });
    };

    // set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // update contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
        console.log("contact");
        console.log(contact);
    };

    // filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };


    // clear filter 
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;