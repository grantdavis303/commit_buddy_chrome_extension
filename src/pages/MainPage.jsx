import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { TrashIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import GeneratedMessageCard from '../components/GeneratedMessageCard.jsx'
import VersionNumber from '../components/VersionNumber.jsx'
import { placeholderFiles, placeholderMessages } from '../scripts/placeholder_text.ts'
import '../App.css'

// Generate and store a random number for input placeholder text
const placeholderCount = 10
const randValue = Math.floor(Math.random() * placeholderCount)

// The big goal is to have data that's typed into the text inputs save
// if the user accidentally (or deliberately) clicks out of the window,
// as well as load the data automatically load upon reopen of the extension.

function MainPage() {
  let winStatus

  window.open ? winStatus = 'Open' : winStatus = 'Closed'

  // Setting State

  const [data, setData] = useState({
    filePath: '',
    messageContent: ''
  })

  // Updating State

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

  function loadFromLocalStorage() {
    setData({
      filePath: localStorage.getItem('Path'),
      messageContent: localStorage.getItem('Message')
    });
  }

  function clearLocalStorage() {
    localStorage.clear()

    setData({
      filePath: '',
      messageContent: ''
    });
  }

  // Independent Functions

  // Check local storage to see if any commands exist
  function hasSavedCommands() {
    return localStorage.getItem('Path') == null && localStorage.getItem('Message') == null ? false : true
  }

  // Return the status of if local storage has any commands saved in it
  function currentLocalStorageStatus() {
    return hasSavedCommands() ? 'Commands saved in local storage.' : 'No commands saved in local storage.'
  }

  // Automatically load commands from local storage if they do exist
  useEffect(() => {
    if (hasSavedCommands() == true) {
      return loadFromLocalStorage()
    }
  }, []);

  return (
    <div className='mainPage'>
      <h1 className='title'> Commit Buddy </h1>

      {console.log('Commit Buddy: ', winStatus)}

      <p className='localStorageMessage'>{currentLocalStorageStatus()}</p>

      <div>
        <TrashIcon className='trashIcon' title='Delete saved commands from local storage.' onClick={clearLocalStorage} />
      </div>

      <div>
        <div className='iconBlockWrapper'>
          <h2> Files and File Paths </h2>
          <QuestionMarkCircleIcon className='questionMarkIcon' title='Manually type the file or file path, or copy and paste the relative path from your IDE. Use spaces to add multiple files.' />
        </div>

        <TextField className='inputText' fullWidth value={data.filePath} onChange={changeFilePath} placeholder={placeholderFiles[randValue]} />
      </div>

      <div>
        <div className='iconBlockWrapper'>
          <h2> Commit Message </h2>
          <QuestionMarkCircleIcon className='questionMarkIcon' title='Write a short, descriptive message summarizing your changes.' />
        </div>

        <TextField className='inputText' fullWidth value={data.messageContent} onChange={changeMessageContent} placeholder={placeholderMessages[randValue]} />
      </div>

      <h2> Generated Message </h2>

      <GeneratedMessageCard content={data} />

      <VersionNumber />
    </div>
  )
}

export default MainPage
