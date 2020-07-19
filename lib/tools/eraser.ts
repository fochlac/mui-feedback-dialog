import { useEffect } from 'react'
import { attachHandlers } from '../utils/handlers'

export const useEraser = (canvasRef: React.RefObject<HTMLCanvasElement>, dialogRef: React.RefObject<HTMLDivElement>, penRef: React.RefObject<HTMLDivElement>): void => {
    let lastPoint = null

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
                const size = 10 / scale
                const xDiff = start.x - x
                const yDiff = start.y - y
                const offset = size / 2
                if (Math.abs(xDiff) > Math.abs(yDiff)) {
                    const startX = start.x < x ? start.x : x
                    const endX = Math.round(start.x < x ? x : start.x)
                    const startY = start.x < x ? start.y : y
                    const endY = Math.round(start.x < x ? y : start.y)
                    const slope = (endY - startY) / (endX - startX)

                    if (Math.round(slope * (endX - startX)) === 0) {
                        context.clearRect(startX - offset, startY - offset, endX - startX + size, size)
                    }
                    else {
                        let step = 0
                        let lastStep = 0
                        let lastX = startX
                        let lastY = Math.round(startY)

                        while (startX + step < endX) {
                            step += 1
                            if (lastY !== Math.round(slope * step + startY)) {
                                context.clearRect(lastX - offset, lastY - offset, step - lastStep + offset, size)

                                lastY = Math.round(slope * step + startY)
                                lastX += (step - lastStep)
                                lastStep = step
                            }
                        }
                        if (step !== lastStep) {
                            context.clearRect(lastX - offset, lastY - offset, step - lastStep + offset, size)
                        }
                    }
                }
                else {
                    const startX = start.y < y ? start.x : x
                    const endX = Math.round(start.y < y ? x : start.x)
                    const startY = start.y < y ? start.y : y
                    const endY = Math.round(start.y < y ? y : start.y)
                    const slope = (endX - startX) / (endY - startY)

                    if (slope === 0) {
                        context.clearRect(startX - offset, startY - offset, size, endY - startY + size)
                    }
                    else {
                        let step = 0
                        let lastStep = 0
                        let lastX = Math.round(startX)
                        let lastY = startY

                        while (startY + step < endY) {
                            step += 1
                            if (lastX !== Math.round(slope * step + startX)) {
                                context.clearRect(lastX - offset, lastY - offset, size, step - lastStep + offset)

                                lastX = Math.round(slope * step + startX)
                                lastY += (step - lastStep)
                                lastStep = step
                            }
                        }
                        if (step !== lastStep) {
                            context.clearRect(lastX - offset, lastY - offset, size, step - lastStep + offset)
                        }
                    }
                }
            }

            return attachHandlers(canvasRef, dialogRef, handleMouseDown, handleMouseMove, handleMouseUp)
        }
    }, [canvasRef && canvasRef.current, dialogRef && dialogRef.current])
}
