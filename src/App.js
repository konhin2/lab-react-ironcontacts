import React, { useState } from 'react'
import './App.css';
import contacts from './contacts.json'

function App() {
  // IMPORTACIONES
  const [ state, setState ] = useState(contacts.slice(0,5))
    
  // FUNCIONES
  const getRandom = (event) => {
    event.preventDefault()
    const filteredArray = contacts.filter((contact) => {
      return !state.find((c) => c.id === contact.id)
    })
    setState(
      [...state, filteredArray[Math.floor(Math.random() * filteredArray.length)]]
    )
  }
  // SORT
  const sortedName = (event) => {
    event.preventDefault()
    const sortedArray = [...state.sort((a, b) => a.name.localeCompare(b.name))]
    setState(
      sortedArray
    )
  }
  const sortedPopularity = (event) => {
    event.preventDefault()
    const filteredContactsArray = [...state]
    filteredContactsArray.sort((a, b)=>{
      return b.popularity - a.popularity
    })
    setState(filteredContactsArray)
  }
  // Delete
  const deteleContact = (event, element) => {
    event.preventDefault()
    const filteredArray = state.filter((e) => {
      return e.id !== element.id
    })
    setState(filteredArray)
  }
  return (
    <div className="container">
      <table className="table">
        <caption>IronContacts</caption>
        <button onClick={(e) => getRandom(e)}>Add Random Contact</button>
        <button onClick={(e) => sortedName(e)}>Sorted By Name</button>
        <button onClick={(e) => sortedPopularity(e)}>Sorted By Popularity</button>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Action</th>
        </tr>
        {
          state.map(contact => {
            return (
              <tr>
                <td><img src={contact.pictureUrl} className='img-size'/></td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>
                  <button className="delete" onClick={(e) => {deteleContact(e, contact)}}>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </table>
    </div>
  );
}

export default App;
