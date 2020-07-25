import React, { useState } from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'

import { Input } from './index'

const DATE_FORMAT = 'DD-MM-YYYY'

const DatePickerInput = ({ hookRef, label, name, placeholder }) => {
    const [calendarDate, setCalendarDate] = useState(dayjs().format(DATE_FORMAT))
    const [showCalendar, setShowCalendar] = useState(false)

    const handleChange = date => {
        setCalendarDate(dayjs(date).format(DATE_FORMAT))
        setShowCalendar(false)
    }
    return (
        <>
            {label && <label className="mb-1" htmlFor={"for " + name}>{label}</label>}
            <div className="relative w-full">
                <Input 
                    readOnly
                    value={calendarDate}
                    className="w-full"
                    placeholder={placeholder}
                    name={name}
                    onFocus={() => setShowCalendar(!showCalendar)}
                    hookRef={hookRef}
                    // onBlur={() => setShowCalendar(!showCalendar)}
                />
                <Calendar 
                    className={`w-full border-0 ${showCalendar ? 'block' : 'hidden'}`}
                    onChange={handleChange}
                />
            </div>
        </>
    )
}

export default DatePickerInput