import React from 'react'
import {
    DialogTitle,
    DialogContent,
    Button,
    Dialog,
    DialogActions,
    DialogContentText,
    TextField,
    FormControlLabel,
    Checkbox,
    Collapse,
    Box,
    ButtonGroup,
    Tooltip,
    Typography,
    Alert
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import { EraserIcon } from './icons/Eraser'
import StopIcon from '@mui/icons-material/Stop'
import { useFeedbackDialogController } from './useFeedback'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { colors } from '@mui/material'
import { LoadingLayer } from './LoadingLayer'

const defaultText = {
    title: 'Give Feedback',
    cancel: 'Cancel',
    submit: 'Submit Feedback',
    successText: 'Thank you for submitting feedback.',
    contentText:
        'Thank you for giving feedback. Please describe any issue as detailed as possible. ' +
        'If it is okay to contact you for more details, please write down your email address as well.',
    feedbackLabel: 'Description',
    emailLabel: 'Email Address',
    emailError: 'Please enter a valid email address.',
    includeScreenshot: 'Attach Screenshot',
    tooltipPen: 'Pen',
    tooltipEraser: 'Eraser',
    tooltipBlackbox: 'Black Rectangle',
    tooltipReset: 'Reset Drawings',
    tooltipSubmit: 'Please enter a short description.',
    screenshotInfo:
        'If you select "Attach Screenshot", the browser will ask you to share your screen. ' +
        'Please select the current browser tab, of which a single screenshot will be taken and displayed for preview below.'
}

interface Props {
    open?: boolean;
    noScreenshot?: boolean;
    attachScreenshotOnOpen?: boolean;
    useScreencapture?: boolean;
    showSuccessScreen?: boolean;
    onClose?: () => void;
    onSubmit?: (feedback: { screenshot?: string; description: string; email: string }) => unknown;
    initialEmail?: string;
    className?: string;
    text?: Record<string, string>;
}
const email_regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const FeedbackDialog: React.FunctionComponent<Props> = ({
    open,
    onClose,
    attachScreenshotOnOpen,
    text,
    onSubmit,
    className,
    initialEmail,
    noScreenshot,
    showSuccessScreen,
    useScreencapture
}) => {
    const {
        closeDialog,
        dialogVisible,
        submit,
        canSubmit,
        includeSS,
        onSSChange,
        canvasRef,
        drawCanvasRef,
        dialogRef,
        resetDrawing,
        useEraser,
        usePen,
        isPenActive,
        isEraserActive,
        isBlackboxActive,
        useBlackBox,
        description,
        onDescriptionChange,
        email,
        onEmailChange,
        penRef,
        state,
        error
    } = useFeedbackDialogController({
        onClose,
        open,
        onSubmit,
        initialEmail,
        showSuccessScreen,
        useScreencapture: !noScreenshot && useScreencapture,
        attachScreenshotOnOpen: !noScreenshot && attachScreenshotOnOpen
    })

    const t = {
        ...defaultText,
        ...(text || {})
    }

    return (
        <Dialog
            open={open}
            maxWidth="md"
            onClose={closeDialog}
            ref={dialogRef}
            style={{ marginTop: 48, visibility: dialogVisible ? 'visible' : 'hidden' }}
            classes={{ container: className }}
        >
            <LoadingLayer state={state} message={t[`${state}Text`] || state === 'error' && error} />
            <DialogTitle>{t.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t.contentText}</DialogContentText>
                {error && <Alert severity='error'>{error}</Alert>}
                <TextField
                    variant="standard"
                    style={{ marginBottom: 8 }}
                    autoFocus
                    value={email}
                    onChange={onEmailChange}
                    error={Boolean(email) && !email_regex.test(email)}
                    helperText={email && !email_regex.test(email) && t.emailError}
                    margin="dense"
                    id="email"
                    InputLabelProps={{
                        shrink: true
                    }}
                    label={t.emailLabel}
                    fullWidth
                />
                <TextField
                    variant="standard"
                    style={{ overflowY: 'visible', height: 'auto' }}
                    autoFocus
                    value={description}
                    onChange={onDescriptionChange}
                    margin="dense"
                    id="description"
                    InputLabelProps={{
                        shrink: true
                    }}
                    label={t.feedbackLabel}
                    multiline
                    required
                    rows={4}
                    fullWidth
                />
                {!noScreenshot && useScreencapture && !includeSS && (
                    <Box
                        style={{
                            display: 'flex',
                            padding: 8,
                            margin: '8px 0',
                            background: colors.blue[50],
                            color: colors.blue[900]
                        }}
                    >
                        <InfoOutlinedIcon style={{ marginRight: 8 }} />
                        <Typography>{t.screenshotInfo}</Typography>
                    </Box>
                )}
                {!noScreenshot && (
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                        <FormControlLabel
                            control={<Checkbox checked={includeSS} onChange={onSSChange} name="checkedB" color="primary" />}
                            label={t.includeScreenshot}
                        />
                        {includeSS && (
                            <ButtonGroup size="small">
                                <Tooltip arrow title={t.tooltipPen}>
                                    <Button
                                        onClick={usePen}
                                        variant={isPenActive ? 'contained' : 'outlined'}
                                        disableElevation
                                        disableRipple
                                    >
                                        <CreateIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip arrow title={t.tooltipEraser}>
                                    <Button
                                        onClick={useEraser}
                                        variant={isEraserActive ? 'contained' : 'outlined'}
                                        disableElevation
                                        disableRipple
                                    >
                                        <EraserIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip arrow title={t.tooltipBlackbox}>
                                    <Button
                                        onClick={useBlackBox}
                                        variant={isBlackboxActive ? 'contained' : 'outlined'}
                                        disableElevation
                                        disableRipple
                                    >
                                        <StopIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip arrow title={t.tooltipReset}>
                                    <Button onClick={resetDrawing}>
                                        <RotateLeftIcon />
                                    </Button>
                                </Tooltip>
                            </ButtonGroup>
                        )}
                    </Box>
                )}
                <Collapse in={includeSS} timeout="auto" enter={false} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ cursor: 'none', border: 'solid 1px black', position: 'relative', overflow: 'hidden' }}>
                        <div
                            ref={penRef}
                            style={{
                                position: 'absolute',
                                pointerEvents: 'none',
                                zIndex: 1,
                                transform: 'translate(-50%, -50%)',
                                visibility: 'visible',
                                width: 3,
                                height: 3,
                                borderRadius: '50%',
                                backgroundColor: 'red'
                            }}
                        />
                        <canvas ref={canvasRef} width={550} height={350} />
                        <canvas style={{ position: 'absolute', top: 0, left: 0 }} ref={drawCanvasRef} width={550} height={350} />
                    </div>
                </Collapse>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} className="cancel-button">
                    {t.cancel}
                </Button>
                <Tooltip
                    arrow
                    title={t.tooltipSubmit}
                    placement="top"
                    disableFocusListener={!!canSubmit}
                    disableHoverListener={!!canSubmit}
                    disableTouchListener={!!canSubmit}
                >
                    <Button
                        onClick={submit}
                        disabled={Boolean(!canSubmit || (email && !email_regex.test(email)))}
                        component="div"
                        color="primary"
                        className="submit-button"
                    >
                        {t.submit}
                    </Button>
                </Tooltip>
            </DialogActions>
        </Dialog>
    )
}

export { FeedbackDialog }
