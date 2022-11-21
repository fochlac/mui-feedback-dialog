import React from 'react'

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingLayer: React.FunctionComponent<{ state: 'feedback' | 'submit' | 'success' | 'error'; message?: string }> = ({state, message}) => {

    if (['submit', 'success', 'error'].includes(state)) {
        return <Box sx={{
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
        }} key='overlay'>
            <Box sx={{
                display: 'flex',
                maxWidth: '75%',
                overflow: 'hidden',
                padding: 32,
                background: 'white',
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                {state==='error' && <ErrorOutlineRoundedIcon color="secondary" sx={{ width: '120px !important',
                    height: '120px !important'}}/>}
                {state==='success' && <CheckCircleOutlineRoundedIcon color="primary" sx={{ width: '120px !important',
                    height: '120px !important'}}/>}
                {state==='submit' && <CircularProgress size={90}/>}
                {message && (
                    <Typography variant="h4" sx={{ marginTop: 10,
                        marginBottom: 20,
                        textAlign: 'center'}}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Box>
    }

    return null
}

export {
    LoadingLayer
}
