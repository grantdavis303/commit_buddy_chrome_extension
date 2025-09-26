import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { TrashIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import GeneratedMessageCard from '../components/GeneratedMessageCard.jsx'
import VersionNumber from '../components/VersionNumber.jsx'
import { placeholderFiles, placeholderMessages } from '../scripts/placeholder_text.ts'
import '../App.css'


// The big goal is to have data that's typed into the text inputs to save
// if the user accidentally (or not accidentally) clicks out of the window,
// as well as the data to automatically load upon reopen.

// Generate and store random number for placeholders
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

  // Check local storage for existing files
  function checkLocalStorage() {
    const noSavedFiles = localStorage.getItem('Path') == null && localStorage.getItem('Message') == null

    if (noSavedFiles) {
      return 'No files saved in local storage.'
    } else {
      return 'Files saved in local storage.'
    }
  }

  // Automatically load values from local storage
  useEffect(() => {
    const filesSavedInLocalStorage = checkLocalStorage() == 'Files saved in local storage.'

    if (filesSavedInLocalStorage) {
      return loadFromLocalStorage()
    }
  }, []);

  // Load values from local storage
  function loadFromLocalStorage() {
    setData({
      filePath: localStorage.getItem('Path'),
      messageContent: localStorage.getItem('Message')
    });
  }

  // Clear existing content in local storage
  function clearLocalStorage() {
    localStorage.clear()

    setData({
      filePath: '',
      messageContent: ''
    });
  }

  return (
    <div className='mainPage'>
      <h1 className='title'> Commit Buddy </h1>

      {console.log('Commit Buddy: ', winStatus)}

      <p className='localStorageMessage'>{checkLocalStorage()}</p>

      <div>
        <TrashIcon className='localStorageIcon' onClick={clearLocalStorage} />
      </div>

      <div>
        <div className='iconBlockWrapper'>
          <h2> Files and File Paths </h2>
          <QuestionMarkCircleIcon className='questionMarkIcon' title='You can manually type in the file or file path, or copy and paste the relative path from your IDE. Add multiple files or file paths with spaces.' />
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
