# mui-feedback-dialog

A customizeable React feedback form with optional screenshot via screen capture and canvas editor based on material-ui.

## API

#### Installation

`npm install --save mui-feedback-dialog`

#### Usage
```
import { FeedbackDialog } from 'mui-feedback-dialog'


const FeedbackButton: React.FunctionComponent<{ mobile?: boolean }> = () => {
    const [dialogVisible, setDialogVisible] = useState(false)

    return <>
        <IconButton onClick={() => setDialogVisible(true)} size={mobile ? 'small' : 'medium'}>
            <FeedbackIcon  fontSize={mobile ? 'default' : 'large'} className={styles['icon']}/>
        </IconButton>
        <FeedbackDialog open={dialogVisible} onClose={() => setDialogVisible(false)} onSubmit={console.log} />
    </>
}
```
#### Screenshot
![SampleScreenshot](https://github.com/fochlac/mui-feedback-dialog/blob/master/feedback-dialog.jpg?raw=true)
