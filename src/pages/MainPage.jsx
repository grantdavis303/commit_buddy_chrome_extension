import { useState } from 'react'
import { TextField } from '@mui/material'
import GeneratedMessageCard from '../components/GeneratedMessageCard.jsx'
import PushMainMessageCard from '../components/PushMainMessageCard.jsx'
import { placeholderFiles, placeholderMessages } from '../scripts/placeholder_text.ts'
import { storeRandomValue } from '../scripts/random_value.ts'
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

function MainPage() {
  // const winOpen = !window.closed
  // const winClosed = window.closed
  // window.parent, window.top, window.opener

  const [data, setData] = useState({
    filePath: '',
    messageContent: ''
  })

  // Generate & Store Random Number for Placeholders
  const placeholderCount = 10;
  const randValue = Math.floor(Math.random() * placeholderCount);
  storeRandomValue(randValue)

  function changeFilePath(path) {
    setData({
      ...data,
      filePath: path.target.value,
    });
  }

  function changeMessageContent(content) {
    setData({
      ...data,
      messageContent: content.target.value,
    });
  }

  return (
    <>
      <h1 className='title'> Commit Buddy </h1>

      <p> A simple JavaScript tool that dynamically creates Git commit commands based on user input. </p>

      <div>
        <h2> Files and File Paths </h2>

        <p> You can manually type in the file or file path, or copy and paste the relative path from your IDE. Add multiple files or file paths with spaces. </p>

        <TextField fullWidth value={data.filePath} onChange={changeFilePath} placeholder={placeholderFiles[randValue]} />
      </div>

      <div>
        <h2> Commit Message </h2>

        <TextField fullWidth value={data.commitMessage} onChange={changeMessageContent} placeholder={placeholderMessages[randValue]} />
      </div>

      <h2> Generated Message </h2>

      <GeneratedMessageCard content={data} />
      <PushMainMessageCard />
    </>
  )
}

export default MainPage
