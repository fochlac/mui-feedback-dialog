
import React from 'react'
import { DialogTitle, DialogContent, Button, Dialog, DialogActions, DialogContentText, TextField, FormControlLabel, Checkbox, Collapse, Box, ButtonGroup, Tooltip, Typography } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import { EraserIcon } from './icons/Eraser';
import StopIcon from '@material-ui/icons/Stop'
import { useFeedbackDialogController } from './useFeedback';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { colors } from '@material-ui/core'

const defaultText = {
    title: 'Give Feedback',
    cancel: 'Cancel',
    submit: 'Submit Feedback',
    contentText: 'Thank you for giving feedback. Please describe any issue as detailed as possible.',
    feedbackLabel: 'Description',
    includeScreenshot: 'Attach Screenshot',
    tooltipPen: 'Pen',
    tooltipEraser: 'Eraser',
    tooltipBlackbox: 'Black Rectangle',
    tooltipReset: 'Reset Drawings',
    tooltipSubmit: 'Please enter a short description.',
    screenshotInfo: 'If you select "Attach Screenshot", the browser will ask you to share your screen. ' +
        'Please select the current browser tab, of which a single screenshot will be taken and displayed for preview below.'
}

interface Props {
    open?: boolean;
    onClose?: Function;
    onSubmit?: (feedback: { screenshot?: string; description: string }) => unknown;
    text?: Record<string, string>;
}

const FeedbackDialog: React.FunctionComponent<Props> = ({ open, onClose, text, onSubmit }) => {
    const {
        closeDialog,
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
        penRef
    } = useFeedbackDialogController({ onClose, open, onSubmit })

    const t = {
        ...defaultText,
        ...(text || {})
    }

    return <Dialog open={open} maxWidth='md' onClose={closeDialog} ref={dialogRef} style={{ marginTop: 48 }}>
        <DialogTitle>
            {t.title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                {t.contentText}
            </DialogContentText>
            <TextField
                style={{ overflowY: 'visible', height: 'auto' }}
                autoFocus
                value={description}
                onChange={onDescriptionChange}
                margin="dense"
                id="description"
                label={t.feedbackLabel}
                multiline
                rows={4}
                fullWidth
            />
            {!includeSS && (
                <Box style={{
                    display: 'flex',
                    padding: 8,
                    margin: '8px 0',
                    background: colors.blue[50],
                    color: colors.blue[900]
                }}>
                    <InfoOutlinedIcon style={{ marginRight: 8 }} />
                    <Typography>{t.screenshotInfo}</Typography>
                </Box>
            )
            }
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={includeSS}
                            onChange={onSSChange}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label={t.includeScreenshot}
                />
                {includeSS && <ButtonGroup size="small">
                    <Tooltip arrow title={t.tooltipPen}>
                        <Button onClick={usePen}
                            variant={isPenActive ? 'contained' : 'outlined'}
                            color={isPenActive ? 'primary' : 'default'}
                            disableElevation disableRipple>
                            <CreateIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip arrow title={t.tooltipEraser}>
                        <Button onClick={useEraser}
                            variant={isEraserActive ? 'contained' : 'outlined'}
                            color={isEraserActive ? 'primary' : 'default'}
                            disableElevation disableRipple>
                            <EraserIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip arrow title={t.tooltipBlackbox}>
                        <Button onClick={useBlackBox}
                            variant={isBlackboxActive ? 'contained' : 'outlined'}
                            color={isBlackboxActive ? 'primary' : 'default'}
                            disableElevation disableRipple>
                            <StopIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip arrow title={t.tooltipReset}>
                        <Button onClick={resetDrawing}>
                            <RotateLeftIcon />
                        </Button>
                    </Tooltip>
                </ButtonGroup>}
            </Box>
            <Collapse in={includeSS} timeout="auto" enter={false} style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ border: 'solid 1px black', position: "relative", overflow: 'hidden' }}>
                    <div ref={penRef} style={{
                        position: "absolute",
                        pointerEvents: 'none',
                        zIndex: 1,
                        transform: 'translate(-50%, -50%)',
                        visibility: 'visible',
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        backgroundColor: 'red'
                    }} />
                    <canvas
                        ref={canvasRef}
                        width={550}
                        height={350} />
                    <canvas
                        style={{ position: "absolute", top: 0, left: 0 }}
                        ref={drawCanvasRef}
                        width={550}
                        height={350} />
                </div>
            </Collapse>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog} color='default'>
                {t.cancel}
            </Button>
            <Tooltip
                arrow title={t.tooltipSubmit}
                placement='top'
                disableFocusListener={!!canSubmit}
                disableHoverListener={!!canSubmit}
                disableTouchListener={!!canSubmit}>
                <Button onClick={submit} disabled={!canSubmit} component='div' color='primary'>
                    {t.submit}
                </Button>
            </Tooltip>
        </DialogActions>
    </Dialog>
}

export {
    FeedbackDialog
}
