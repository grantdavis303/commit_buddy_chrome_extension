import { useState } from 'react'
import './GeneratedMessageCard.css'

function GeneratedMessageCard(commitMessage) {
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const copyToClipboard = () => {
    const filePath = `git add ${commitMessage.content.filePath}`;
    const messageContent = `git commit -m "${commitMessage.content.messageContent}"`;
    const commands = filePath + '\n' + messageContent;

    navigator.clipboard.writeText(commands);

    setCopyButtonText('Copied!');

    setTimeout(() => {
      setCopyButtonText('Copy');
    }, 1500);
  }

  return (
    <>
      <div id="CodeContainer">
        <p style={{ color: '#28e1ff'}}> git
          <span style={{color: '#ff82ee'}}> add </span>
          <span style={{color: '#ffff3c'}}>{commitMessage.content.filePath}</span>
        </p>
        <p style={{ color: '#28e1ff'}}>git
          <span style={{color: '#ff82ee'}}> commit </span>
          <span style={{color: '#fd90b3'}}> -m </span>
          <span style={{color: '#81ee66'}}>"{commitMessage.content.messageContent}"</span>
        </p>
      </div>

      <div id='CopyButton'>
        <button onClick={copyToClipboard}>{copyButtonText}</button>
      </div>
    </>
  )
}

export default GeneratedMessageCard
