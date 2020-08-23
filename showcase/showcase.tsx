import React from 'react'
import ReactDOM from "react-dom";

import { IconButton, Tooltip } from '@material-ui/core'

import FeedbackIcon from '@material-ui/icons/Feedback';
import { FeedbackDialog } from '../lib/index'


const FeedbackButton = () => {
    const [dialogVisible, setDialogVisible] = React.useState(false)

    return <>
        <Tooltip title='Send Feedback' arrow>
            <IconButton onClick={() => setDialogVisible(true)} size='medium'>
                <FeedbackIcon fontSize='large' />
            </IconButton>
        </Tooltip>
        <FeedbackDialog
            open={dialogVisible}
            onClose={() => setDialogVisible(false)}
            onSubmit={console.log} />
    </>
}

function App() {
  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <h1>Feedback Dialog Showcase</h1>
      <h2>Click the Feedback Button below to open the dialog.</h2>
      <FeedbackButton />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
