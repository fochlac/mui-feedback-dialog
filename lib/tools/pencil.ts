import { useEffect } from "react"
import { attachHandlers } from "../utils/handlers"

export const usePencil = (canvasRef, dialogRef, penRef) => {
    let lastPoint = null

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d')

            const getPoint = e => {
                const { top, left, width } = canvasRef.current.getBoundingClientRect()
                const scale = width / canvasRef.current.width

                const touchX = e.touches ? e.touches[0].clientX : e.clientX
                const touchY = e.touches ? e.touches[0].clientY : e.clientY

                const x = ((touchX - left) / scale)
                const y = ((touchY - top) / scale)

                return { x, y, unscaled: {x: touchX - left, y: touchY - top} }
            }

            const handleMouseDown = (e) => {
                if (e.button === 0) {
                    e.preventDefault()
                    e.stopPropagation()

                    lastPoint = getPoint(e)
                }
            }

            const handleMouseMove = (e) => {
                if (lastPoint) {
                    drawLine(lastPoint, getPoint(e))
                    lastPoint = getPoint(e)
                }
                if (penRef.current) {
                    const { unscaled } = getPoint(e)
                    penRef.current.style.left = unscaled.x + 'px'
                    penRef.current.style.top = unscaled.y + 'px'
                }
            }

            const handleMouseUp = (e) => {
                handleMouseMove(e)
                lastPoint = null
            }

            const drawLine = (start, { x, y }) => {
                const scale = canvasRef.current.getBoundingClientRect().width / canvasRef.current.width

                context.save()
                context.lineJoin = 'round'
                context.lineCap = 'round'
                context.beginPath()
                context.lineWidth = 2 / scale
                context.strokeStyle = 'red'
                context.globalCompositeOperation = 'source-over'
                context.moveTo(start.x, start.y)
                context.lineTo(x, y)
                context.closePath()
                context.stroke()
                context.restore()
            }

            return attachHandlers(canvasRef, dialogRef, handleMouseDown, handleMouseMove, handleMouseUp)
        }
    }, [canvasRef && canvasRef.current, dialogRef && dialogRef.current])
}
