export const attachHandlers = (canvasRef, dialogRef, handleMouseDown, handleMouseMove, handleMouseUp) => {
    const handleMouseOut = (e) => {
        e = e || window.event
        const from = e.relatedTarget || e.toElement
        if (!from || from.nodeName === 'HTML' || from === dialogRef.current) {
            handleMouseUp(e)
        }
    }

    canvasRef.current.addEventListener('mousedown', handleMouseDown)
    dialogRef.current.addEventListener('mousemove', handleMouseMove)
    dialogRef.current.addEventListener('mouseup', handleMouseUp)
    dialogRef.current.addEventListener('mouseout', handleMouseOut)
    canvasRef.current.addEventListener('touchstart', handleMouseDown)
    dialogRef.current.addEventListener('touchmove', handleMouseMove)
    dialogRef.current.addEventListener('touchend', handleMouseUp)
    dialogRef.current.addEventListener('touchcancel', handleMouseUp)

    return () => {
        if (canvasRef.current) {
            canvasRef.current.removeEventListener('mousedown', handleMouseDown)
            dialogRef.current.removeEventListener('mousemove', handleMouseMove)
            dialogRef.current.removeEventListener('mouseup', handleMouseUp)
            dialogRef.current.removeEventListener('mouseout', handleMouseOut)
            canvasRef.current.removeEventListener('touchstart', handleMouseDown)
            dialogRef.current.removeEventListener('touchmove', handleMouseMove)
            dialogRef.current.removeEventListener('touchend', handleMouseUp)
            dialogRef.current.removeEventListener('touchcancel', handleMouseUp)
        }
    }
}
