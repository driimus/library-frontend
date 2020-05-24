import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show, authors }) => {
  if (!show) {
    return null
  }

  if (authors.loading) {
    return <div>loading ...</div>
  }

  const { allAuthors } = authors.data

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm />
    </div>
  )
}

const AuthorForm = () => {
  const [name, setName] = useState('')
  const [newBirthyear, setNewBirthyear] = useState(0)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: newBirthyear } })

    setName('')
    setNewBirthyear(0)
  }

  return (
    <div>
      <h2>Edit author name</h2>

      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          new birth year{' '}
          <input
            value={newBirthyear}
            onChange={({ target }) => setNewBirthyear(parseInt(target.value))}
          />
        </div>
        <button type="submit">edit</button>
      </form>
    </div>
  )
}

export default Authors
