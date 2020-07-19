import { useEffect } from 'react'
import { attachHandlers } from '../utils/handlers'

export const useBlackBox = (canvasRef: React.RefObject<HTMLCanvasElement>, dialogRef: React.RefObject<HTMLDivElement>, penRef: React.RefObject<HTMLDivElement>): void => {
    let start = null
    let imageData = null

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d')

            const getPoint = (e) => {
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
                    start = getPoint(e)
                    imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            }

            const handleMouseMove = (e) => {
                if (start) {
                    context.putImageData(imageData, 0, 0)
                    drawRectangle(getPoint(e))
                }
                if (penRef.current) {
                    const { unscaled } = getPoint(e)
                    penRef.current.style.left = unscaled.x + 'px'
                    penRef.current.style.top = unscaled.y + 'px'
                }
            }

            const handleMouseUp = (e) => {
                handleMouseMove(e)
                start = null
                imageData = null
            }

            const drawRectangle = ({x, y}) => {
                const startX = x < start.x ? x : start.x
                const startY = y < start.y ? y : start.y
                const widthX = Math.abs(start.x - x)
                const widthY = Math.abs(start.y - y)

                context.save()
                context.fillStyle = 'black'
                context.fillRect(startX, startY, widthX, widthY)
                context.restore()
            }

            return attachHandlers(canvasRef, dialogRef, handleMouseDown, handleMouseMove, handleMouseUp)
        }
    }, [canvasRef && canvasRef.current, dialogRef && dialogRef.current])
}
