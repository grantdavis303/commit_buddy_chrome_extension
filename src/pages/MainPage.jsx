import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import GeneratedMessageCard from '../components/GeneratedMessageCard.jsx'
import PushMainMessageCard from '../components/PushMainMessageCard.jsx'
import { placeholderFiles, placeholderMessages } from '../scripts/placeholder_text.ts'
import '../css/component_styles.css'

// The big goal is to have data that's already typed into the inputs to save if
// the user accidentally clicks out of it
// Do we automatically load text from localStorage if the user clicks out of it?

// NOT DONE:

// Save commit data on close
// Save commit data automatically, at a set interval?
// Maybe list a few recent commits, depending on how they're saved
// Add Load button? Load from local storage
// Add functionality for Custom git push origin
// Add Save button? Save to local storage

// Clear local storage message updates "Exists" "Does Not Exist"

// Generate & Store Random Number for Placeholders
const placeholderCount = 10
const randValue = Math.floor(Math.random() * placeholderCount)

function MainPage() {
  let winStatus

  window.open ? winStatus = 'Open' : winStatus = 'Closed'

  const [data, setData] = useState({
    filePath: '',
    messageContent: ''
  })

  function changeFilePath(path) {
    setData({
      ...data,
      filePath: path.target.value,
    });

    localStorage.setItem('Path', path.target.value)
  }

  function changeMessageContent(content) {
    setData({
      ...data,
      messageContent: content.target.value,
    });

    localStorage.setItem('Message', content.target.value)
  }

  // Check local storage for a specific key
  function checkLocalStorage(key) {
    if (localStorage.getItem(key) == null) {
      return 'Does not exist'
    } else {
      return 'Exists'
    }
  }

  // Load values from local storage
  function loadFromLocalStorage() {
    console.log('Path: ', checkLocalStorage('Path'))
    console.log('Message: ', checkLocalStorage('Message'))

    setData({
      filePath: localStorage.getItem('Path'),
      messageContent: localStorage.getItem('Message')
    });
  }

  // Clear existing content in local storage
  function clearLocalStorage() {
    localStorage.clear()
  }

  return (
    <>
      <h1 className='title'> Commit Buddy </h1>

      <p>{winStatus}</p>

      <p>{checkLocalStorage('Path')}</p>
      <p>{checkLocalStorage('Message')}</p>

      <Button variant='outlined' onClick={loadFromLocalStorage}>Load from Local Storage</Button>
      <Button variant='outlined' onClick={clearLocalStorage}>Clear Local Storage</Button>

      <p> A simple JavaScript tool that dynamically creates Git commit commands based on user input. </p>

      <div>
        <h2> Files and File Paths </h2>

        <p> You can manually type in the file or file path, or copy and paste the relative path from your IDE. Add multiple files or file paths with spaces. </p>

        <TextField fullWidth value={data.filePath} onChange={changeFilePath} placeholder={placeholderFiles[randValue]} />
      </div>

      <div>
        <h2> Commit Message </h2>

        <TextField fullWidth value={data.messageContent} onChange={changeMessageContent} placeholder={placeholderMessages[randValue]} />
      </div>

      <h2> Generated Message </h2>

      <GeneratedMessageCard content={data} />
      <PushMainMessageCard />
    </>
  )
}

export default MainPage
