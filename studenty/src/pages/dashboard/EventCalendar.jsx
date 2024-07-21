import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
export default function EventCalendar() {
  return (
    <div className="m-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col bg-white rounded shadow-lg p-4">
        <span className="text-lg font-semibold mb-2">Events Calendar</span>
        <div className="flex flex-row justify-between mb-4">
          <div className="flex flex-col items-start">
            <span className="text-blue-600">08 Jan, 2023</span>
            <span>School Annual Function</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-red-600">27 Jan, 2023</span>
            <span>Sport Competition</span>
          </div>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="p-4 w-full bg-gray-100 rounded">
            <DateField
              label="Full letter month"
              defaultValue={dayjs("2023-01-08")}
              format="LL"
              className="w-full mb-4"
            />
            <DateCalendar defaultValue={dayjs(Date.now())} />
          </div>
        </LocalizationProvider>
      </div>
    </div>
  );
}
