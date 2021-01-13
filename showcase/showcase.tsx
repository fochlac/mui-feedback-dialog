import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Checkbox, FormControlLabel, IconButton } from "@material-ui/core";

import FeedbackIcon from "@material-ui/icons/Feedback";
import { FeedbackDialog } from "../lib/index";

function App() {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [noScreenshot, setNoScreenshot] = useState(false);
    const [useScreencapture, setUseScreencapture] = useState(false);
    const [attachScreenshotOnOpen, setAttachScreenshotOnOpen] = useState(false);
    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <h1>Feedback Dialog Showcase</h1>
            <h2>Click the Feedback Button below to open the dialog.</h2>
            <IconButton onClick={() => setDialogVisible(true)} size="medium">
                <FeedbackIcon fontSize="large" />
            </IconButton>
            <FeedbackDialog
                open={dialogVisible}
                onClose={() => setDialogVisible(false)}
                onSubmit={console.log}
                {...{ noScreenshot, useScreencapture, attachScreenshotOnOpen }}
            />
            <p>You can toggle the props here:</p>
            <div>
                <FormControlLabel
                    control={
                        <Checkbox checked={noScreenshot} onChange={(e) => setNoScreenshot(e.target.checked)} name="noScreenshot" color="primary" />
                    }
                    label={"noScreenshot"}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={useScreencapture}
                            onChange={(e) => setUseScreencapture(e.target.checked)}
                            name="useScreencapture"
                            color="primary"
                        />
                    }
                    label={"useScreencapture"}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={attachScreenshotOnOpen}
                            onChange={(e) => setAttachScreenshotOnOpen(e.target.checked)}
                            name="attachScreenshotOnOpen"
                            color="primary"
                        />
                    }
                    label={"attachScreenshotOnOpen"}
                />
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
