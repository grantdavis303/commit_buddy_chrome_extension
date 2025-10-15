import { useState } from 'react'
import { Button, Snackbar } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../App.css'

function GeneratedMessageCard(commitMessage) {
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const [open, setOpen] = useState(false);

  function copyToClipboard() {
    const filePath = `git add ${commitMessage.content.filePath}`;
    const messageContent = `git commit -m "${commitMessage.content.messageContent}"`;
    const commands = filePath + '\n' + messageContent;

    navigator.clipboard.writeText(commands);

    setCopyButtonText('Copied!');

    setTimeout(() => {
      setCopyButtonText('Copy');
    }, 1500);

    handleClick();
  }

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme({
    palette: {
      white: '#FFFFFF'
    }
  });

  return (
    <div className='messageCard'>

      <div className='codeContent'>
        <p> git add <span className='filePath'>{commitMessage.content.filePath}</span> </p>
        <p> git commit -m <span className='messageContent'>"{commitMessage.content.messageContent}"</span> </p>
      </div>

      <div className='copyButton'>
        <ThemeProvider theme={theme}>
          <Button variant='outlined' color='white' onClick={copyToClipboard}>{copyButtonText}</Button>
        </ThemeProvider>
      </div>

      <Snackbar
        open={open}
        message='Copied to the clipboard!'
        autoHideDuration={2000}
        onClose={handleClose}
      />
    </div>
  )
}

export default GeneratedMessageCard
