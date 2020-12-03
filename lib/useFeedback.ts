/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useRef, useEffect } from 'react'
import { createHTMLImageCanvas, takeScreenshotCanvas } from './utils/screenshot'
import { usePencil } from './tools/pencil'
import { useEraser } from './tools/eraser'
import { useBlackBox } from './tools/blacken'

export function useFeedbackDialogController ({ onClose, open, onSubmit, useScreencapture, rootElement }) {
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [includeSS, setIncludeSS] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const drawCanvasRef = useRef<HTMLCanvasElement>(null)
    const penRef = useRef<HTMLDivElement>(null)
    const dialogRef = useRef<HTMLDivElement>(null)
    const [activeTool, setActiveTool] = useState<'pen' | 'eraser' | 'blackbox'>('pen')

    usePencil(activeTool === 'pen' && drawCanvasRef, dialogRef, penRef)
    useBlackBox(activeTool === 'blackbox' && drawCanvasRef, dialogRef, penRef)
    useEraser(activeTool === 'eraser' && drawCanvasRef, dialogRef, penRef)

    useEffect(() => {
        setIncludeSS(false)
        setDescription('')
        setEmail('')
        if (canvasRef.current) {
            canvasRef.current.getContext('2d')
                .clearRect(0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight)
            drawCanvasRef.current.getContext('2d')
                .clearRect(0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight)
        }
    }, [open])

    const onSSChange = (e) => {
        const isVisible = e.target.checked
        if (isVisible) {
            dialogRef.current.style.visibility = 'hidden'

            const screenCapture: () => Promise<void | HTMLCanvasElement> = () => useScreencapture
                ? takeScreenshotCanvas(canvasRef.current)
                : Promise.resolve()

            screenCapture()
                .catch(() => createHTMLImageCanvas(canvasRef.current, rootElement))
                .then(() => setIncludeSS(isVisible))
                .catch(() => setIncludeSS(false))
                .then(() => {
                    drawCanvasRef.current.width = canvasRef.current.width
                    drawCanvasRef.current.height = canvasRef.current.height
                    drawCanvasRef.current.style.width = canvasRef.current.style.width
                    drawCanvasRef.current.getContext('2d').setTransform(canvasRef.current.getContext('2d').getTransform())
                    dialogRef.current.style.visibility = 'visible'
                })
        }
        else {
            setIncludeSS(isVisible)
        }
    }

    const resetDrawing = () => {
        if (drawCanvasRef.current) {
            const context = drawCanvasRef.current.getContext('2d')
            context.clearRect(0, 0, drawCanvasRef.current.width, drawCanvasRef.current.height)
        }
    }

    const selectTool = (tool) => {
        if (penRef.current) {
            penRef.current.style.visibility = tool === 'rectangle' ? 'hidden' : 'visible'
            penRef.current.style.width = `${tool === 'eraser' ? 10 : 3}px`
            penRef.current.style.border = tool === 'pen' ? 'none' : 'solid 1px black'
            penRef.current.style.height = `${tool === 'eraser' ? 10 : 3}px`
            penRef.current.style.borderRadius = tool === 'pen' ? '50%' : '0'
            penRef.current.style.backgroundColor = tool === 'pen' ? 'red' : 'white'
        }
        setActiveTool(tool)
    }

    return {
        canSubmit: description.length,
        description,
        email,
        onEmailChange: (e) => setEmail(e.target.value),
        onDescriptionChange: (e) => setDescription(e.target.value),
        includeSS,
        closeDialog: onClose,
        submit: () => {
            if (description.length) {
                let screenshot = null
                if (includeSS) {
                    const context = canvasRef.current.getContext('2d')
                    context.drawImage(drawCanvasRef.current, 0, 0)
                    screenshot = canvasRef.current.toDataURL('webp', 0.9)
                }
                onSubmit && onSubmit({ description, screenshot, email })
                onClose()
            }
        },
        canvasRef,
        penRef,
        dialogRef,
        drawCanvasRef,
        onSSChange,
        resetDrawing,
        useEraser: () => selectTool('eraser'),
        useBlackBox: () => selectTool('blackbox'),
        usePen: () => selectTool('pen'),
        isBlackboxActive: activeTool === 'blackbox',
        isPenActive: activeTool === 'pen',
        isEraserActive: activeTool === 'eraser'
    }
}
