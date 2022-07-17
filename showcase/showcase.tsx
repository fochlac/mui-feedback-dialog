import React, { StrictMode, useState } from 'react'

import { Checkbox, FormControlLabel, IconButton } from '@mui/material'

import FeedbackIcon from '@mui/icons-material/Feedback'
import { FeedbackDialog } from '../lib'
import { createRoot } from 'react-dom/client'

function App () {
    const [dialogVisible, setDialogVisible] = useState(false)
    const [noScreenshot, setNoScreenshot] = useState(false)
    const [showList, setShowList] = useState(false)
    const [useInitialEmail, setUseInitialEmail] = useState(false)
    const [useScreencapture, setUseScreencapture] = useState(false)
    const [errorOnSubmit, setErrorOnSubmit] = useState(false)
    const [attachScreenshotOnOpen, setAttachScreenshotOnOpen] = useState(false)

    const onSubmit = (data) => {
        return new Promise((resolve, reject) => {
            if (errorOnSubmit) {
                setTimeout(() => reject({ message: 'Some error occured!' }), 1500)
            }
            else {
                setTimeout(resolve, 1500)
            }
        }).then(() => console.log(data))
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <h1>Feedback Dialog Showcase</h1>
            <h2>Click the Feedback Button below to open the dialog.</h2>
            <IconButton onClick={() => setDialogVisible(true)} size="medium">
                <FeedbackIcon fontSize="large" />
            </IconButton>
            <FeedbackDialog
                open={dialogVisible}
                initialEmail={useInitialEmail ? 'some@mail.de' : undefined}
                onClose={() => setDialogVisible(false)}
                onSubmit={onSubmit}
                {...{ noScreenshot, useScreencapture, attachScreenshotOnOpen }}
            />
            <p>You can toggle the props here:</p>
            <div>
                <FormControlLabel
                    control={
                        <Checkbox checked={noScreenshot} onChange={(e) => setNoScreenshot(e.target.checked)} name="noScreenshot" color="primary" />
                    }
                    label={'noScreenshot'}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={useScreencapture}
                            onChange={(e) => setUseScreencapture(e.target.checked)}
                            name="useScreencapture"
                            color="primary"
                        />
                    }
                    label={'useScreencapture'}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={useInitialEmail}
                            onChange={(e) => setUseInitialEmail(e.target.checked)}
                            name="initialEmail"
                            color="primary"
                        />
                    }
                    label={'initialEmail'}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={attachScreenshotOnOpen}
                            onChange={(e) => setAttachScreenshotOnOpen(e.target.checked)}
                            name="attachScreenshotOnOpen"
                            color="primary"
                        />
                    }
                    label={'attachScreenshotOnOpen'}
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={errorOnSubmit} onChange={(e) => setErrorOnSubmit(e.target.checked)} name="errorOnSubmit" color="primary" />
                    }
                    label={'errorOnSubmit'}
                />
                <FormControlLabel
                    control={<Checkbox checked={showList} onChange={(e) => setShowList(e.target.checked)} name="errorOnSubmit" color="primary" />}
                    label={'Show list with scrolling'}
                />
            </div>
            {showList && (
                <div style={{ height: 300, overflow: 'auto', marginTop: 16, minWidth: '50%', textAlign: 'center' }}>
                    {Array(100)
                        .fill(0)
                        .map((_v, idx) => (
                            <div key={idx}>Testcontent for Scrolling {idx}</div>
                        ))}
                </div>
            )}
        </div>
    )
}

const container = document.getElementById('root') as HTMLElement
if (container) {
    const root = createRoot(container)

    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    )
}
