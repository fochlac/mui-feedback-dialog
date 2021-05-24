import React from 'react'
import { Typography, CircularProgress } from '@material-ui/core'
import { makeStyles, DefaultTheme } from '@material-ui/styles'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded'
import clsx from 'clsx'

const useStyles = makeStyles<DefaultTheme>({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexGrow: 1,
        background: 'white',
        zIndex: 10000
    },
    content: {
        display: 'flex',
        maxWidth: '75%',
        overflow: 'hidden',
        padding: 32,
        background: 'white',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    message: {
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center'
    },
    icon: {
        width: 120,
        height: 120
    }
})

const LoadingLayer: React.FunctionComponent<{state: 'feedback'|'submit'|'success'|'error'; message?: string}> = ({ state, message }) => {
    const styles = useStyles()

    if (['submit', 'success', 'error'].includes(state)) {
        return <div key='overlay' className={clsx(styles.overlay, 'loading-overlay')}>
            <div className={styles.content}>
                {state === 'error' && <ErrorOutlineRoundedIcon color="secondary" className={styles.icon} />}
                {state === 'success' && <CheckCircleOutlineRoundedIcon color="primary" className={styles.icon} />}
                {state === 'submit' && <CircularProgress size={90} />}
                {message && (
                    <Typography variant="h4" className={clsx(styles.message, 'loading-message')}>
                        {message}
                    </Typography>
                )}
            </div>
        </div>
    }

    return null
}

export {
    LoadingLayer
}
