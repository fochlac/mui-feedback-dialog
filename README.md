# mui-feedback-dialog [![npm version](https://badge.fury.io/js/mui-feedback-dialog.svg)](https://badge.fury.io/js/mui-feedback-dialog)

A customizeable React feedback form with optional screenshot via screen capture and canvas editor based on material-ui.

## API

#### Installation

You also need to include `@material-ui/core`, `@material-ui/icons`, `react`, and `react-dom`. IF you have not already done so, you can install them with: 
`npm install --save @material-ui/core @material-ui/icons react react-dom`

Then you can install this library with:
`npm install --save mui-feedback-dialog`

#### Usage
```
import { FeedbackDialog } from 'mui-feedback-dialog'


const FeedbackButton: React.FunctionComponent<{ mobile?: boolean }> = () => {
    const [dialogVisible, setDialogVisible] = useState(false)

    return <>
        <IconButton onClick={() => setDialogVisible(true)}>
            <FeedbackIcon />
        </IconButton>
        <FeedbackDialog open={dialogVisible} onClose={() => setDialogVisible(false)} onSubmit={console.log} />
    </>
}
```

FeedbackDialog takes 6 props: 
* `open` [boolean]: whether the dialog is shown or not
* `onClose` [function]: callback to close the dialog
* `onSubmit` [function]: callback on submit with the feedback object:
```
{
    description: 'Some description.',
    email: 'some@email.com',
    screenshot: 'base64-encoded screenshot in webp format'
}
```
* `tenantId` [string]: Channel Id of your feedback-channel at [https://feedback.fochlac.com]. You can use this service to store your feedback fully enctypted.
* `className` [string]: className applied to the dialog component.
* `text` [object]: possibility to overwrite the default strings:
    * title
    * cancel
    * submit
    * contentText
    * feedbackLabel
    * includeScreenshot
    * tooltipPen
    * tooltipEraser
    * tooltipBlackbox
    * tooltipReset
    * tooltipSubmit
    * screenshotInfo 

## Screenshot
![SampleScreenshot](https://github.com/fochlac/mui-feedback-dialog/blob/master/feedback-dialog.jpg?raw=true)

## Demo
[CodeSandbox - Demo](https://codesandbox.io/s/feedback-dialog-fdp7b)
