import { useState, useEffect } from 'react'
import GeneratedMessageCard from './components/GeneratedMessageCard.jsx'
import VersionNumber from './components/VersionNumber.jsx'
import { placeholderFiles, placeholderMessages } from './scripts/placeholder_text.ts'
import './App.css'

// Generate random number for the input placeholder text
const placeholderCount = 10
const randValue = Math.floor(Math.random() * placeholderCount)

// The main goal is to have the commands that are into the text inputs save
// if the user accidentally (or deliberately) clicks out of the window,
// as well as load the commands automatically upon reopen of the extension.

function App() {
  let winStatus;

  window.open ? winStatus = 'Open' : winStatus = 'Closed';

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

  // Check local storage to see if any commands exist
  function hasSavedCommands() {
    return localStorage.getItem('Path') == null && localStorage.getItem('Message') == null ? false : true
  }

  // Return the status based on if local storage has anything saved in it
  function currentLocalStorageStatus() {
    return hasSavedCommands() ? 'Commands saved locally.' : 'No commands saved locally.'
  }

  // Automatically load commands from local storage
  useEffect(() => {
    if (hasSavedCommands() == true) {
      return loadFromLocalStorage()
    }
  }, []);

  return (
    <div className='main'>
      <h1 className='title'> Commit Buddy </h1>

      {console.log('Commit Buddy: ', winStatus)}

      <p className='localStorageMessage'>{currentLocalStorageStatus()}</p>

      <div className='iconContainer' title='Delete saved commands.'>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="var(--text)" class="trashIcon" viewBox="0 0 16 16" onClick={clearLocalStorage}>
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
      </div>

      {/* Files and File Paths */}

      <div className="section">
        <div className="sectionTitle">
          <h4> Files and File Paths </h4>

          <div className="iconContainer" title='Manually type the file or file path, or copy and paste the relative path from your IDE. Use spaces to add multiple files.'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--text)" class="informationIcon" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
          </div>
        </div>
        <div className="sectionInput">
          <input type="text" className='inputText' fullWidth value={data.filePath} onChange={changeFilePath} placeholder={placeholderFiles[randValue]} />
        </div>
      </div>

      {/* Commit Message */}

      <div className="section">
        <div className="sectionTitle">
          <h4> Commit Message </h4>

          <div className="iconContainer" title='Write a short, descriptive message summarizing your changes.'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--text)" class="informationIcon" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
          </div>
        </div>
        <div className="sectionInput">
          <input type="text" className='inputText' fullWidth value={data.messageContent} onChange={changeMessageContent} placeholder={placeholderMessages[randValue]} />
        </div>
      </div>

      <GeneratedMessageCard content={data} />
      <VersionNumber />
    </div>
  )
}

export default App
