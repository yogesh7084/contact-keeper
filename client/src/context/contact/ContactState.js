import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contats 
    const getContacts = async contact => {
        try {
            const res = await axios.get('http://localhost:5000/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }

    };

    // Add Contact 
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/contacts', contact, config);
            console.log(res)
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            console.log("err")
            console.log(err)
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }

    };

    // Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`http://localhost:5000/api/contacts/${id}`);
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });

        } catch (err) {
            console.log("err")
            console.log(err)
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    // update contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`http://localhost:5000/api/contacts/${contact._id}`, contact, config);
            console.log(res)
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });

        } catch (err) {
            console.log("err")
            console.log(err)
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    // clear contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };

    // set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
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
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                clearContacts
            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;