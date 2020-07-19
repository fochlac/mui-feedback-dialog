/* tslint:disable */
function getDisplayMedia(options) {
    const nav = navigator as any
    if (nav.mediaDevices && nav.mediaDevices.getDisplayMedia) {
        return nav.mediaDevices.getDisplayMedia(options)
    }
    if (nav.getDisplayMedia) {
        return nav.getDisplayMedia(options)
    }
    if (nav.webkitGetDisplayMedia) {
        return nav.webkitGetDisplayMedia(options)
    }
    if (nav.mozGetDisplayMedia) {
        return nav.mozGetDisplayMedia(options)
    }
    throw new Error('getDisplayMedia is not defined')
}

function getUserMedia(options) {
    const nav = navigator as any
    if (nav.mediaDevices && nav.mediaDevices.getUserMedia) {
        return nav.mediaDevices.getUserMedia(options)
    }
    if (nav.getUserMedia) {
        return nav.getUserMedia(options)
    }
    if (nav.webkitGetUserMedia) {
        return nav.webkitGetUserMedia(options)
    }
    if (nav.mozGetUserMedia) {
        return nav.mozGetUserMedia(options)
    }
    throw new Error('getUserMedia is not defined')
}
/* tslint:enable */

async function takeScreenshotStream() {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/screen
    const width = screen.width * (window.devicePixelRatio || 1)
    const height = screen.height * (window.devicePixelRatio || 1)

    const errors = []
    let stream
    try {
        stream = await getDisplayMedia({
            audio: false,
            // see: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints/video
            video: {
                displaySurface: 'browser',
                width,
                height,
                frameRate: 4,
            },
        })
    } catch (ex) {
        errors.push(ex)
    }

    try {
        // for electron js
        stream = await getUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'tab',
                    // chromeMediaSourceId: source.id,
                    minWidth         : width,
                    maxWidth         : width,
                    minHeight        : height,
                    maxHeight        : height,
                },
            },
        })
    } catch (ex) {
        errors.push(ex)
    }

    if (errors.length) {
        console.debug(...errors)
    }

    return stream
}

export async function takeScreenshotCanvas(canvas) {
    const stream = await takeScreenshotStream()

    if (!stream) {
        return Promise.reject()
    }

    // from: https://stackoverflow.com/a/57665309/5221762
    const video = document.createElement('video')
    const result = await new Promise((resolve, reject) => {
        video.onloadedmetadata = async () => {
            video.play()
            await new Promise(r => setTimeout(r, 251))
            video.pause()

            const context = canvas.getContext('2d')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
            if (video.videoWidth > video.videoHeight) {
                canvas.style.width = '100%'
            }
            else {
                canvas.style.width = Math.ceil(450 / video.videoHeight * video.videoWidth) + 'px'
            }

            resolve(canvas)
        }
        video.srcObject = stream
    })

    stream.getTracks().forEach(function (track) {
        track.stop()
    })

    return result
}
