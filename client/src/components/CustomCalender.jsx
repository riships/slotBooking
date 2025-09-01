import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

function CustomCalender({ date, setDate }) {
    return (
        <LocalizationProvider
            dateAdapter={AdapterMoment}>
            <DateCalendar
                value={moment(date)}
                onChange={setDate}
                sx={{
                    padding: 0,
                }}
            />
        </LocalizationProvider>
    )
}

export default CustomCalender