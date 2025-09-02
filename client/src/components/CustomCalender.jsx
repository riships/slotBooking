import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import Box from "@mui/material/Box";

function CustomCalender({ date, setDate }) {
    return (
        <LocalizationProvider
            dateAdapter={AdapterMoment}>
            <DateCalendar
                value={moment(date)}
                onChange={setDate}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "4px",
                    padding: "0px",
                    cursor: "pointer",
                    minWidth: "300px",
                }}
            />
        </LocalizationProvider>
    )
}

export default CustomCalender