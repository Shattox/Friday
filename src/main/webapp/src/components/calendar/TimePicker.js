import React from 'react';


export default function TimePicker ({hour, setHour, minute, setMinute}) {
    if (hour === null) {
        hour = "";
    }
    if (minute === null) {
        minute = "";
    }

    let timers = {
        hours: [],
        minutes: []
    };

    let setHours = () => {
        for (let i = 0; i < 24; i++) {
            i < 10 ?
                timers.hours.push(<option className={"text-gray-600"} key={'0' + i} value={'0' + i}>{'0' + i}</option>) :
                timers.hours.push(<option className={"text-gray-600"} key={i} value={i}>{i}</option>)
        }
    }

    let setMinutes =  () => {
        for (let i = 0; i < 60; i++) {
            i < 10 ?
                timers.minutes.push(<option className={"text-gray-600"} key={'0' + i} value={'0' + i}>{'0' + i}</option>) :
                timers.minutes.push(<option className={"text-gray-600"} key={i} value={i}>{i}</option>)
        }
    }
    setHours()
    setMinutes()

    return (
        <div className="flex ml-2 w-24 bg-white rounded-lg bg-gray-50 border border-gray-300">
            <select name="hours"
                    className="cursor-pointer hover:text-blue-600 ml-2 bg-transparent text-l appearance-none outline-none"
                    onChange={(e) => setHour(e.target.value)}
                    value={hour}
            >
                {timers.hours.map((value, _) => {
                    return value
                })}
            </select>
            <span className="text-l mt-2 mr-2 ml-3 mb-1">:</span>
            <select name="minutes"
                    className="cursor-pointer hover:text-blue-600 bg-transparent text-l appearance-none outline-none mr-4"
                    onChange={(e) => setMinute(e.target.value)}
                    value={minute}
            >
                {timers.minutes.map((value, _) => {
                    return value
                })}
            </select>
        </div>
    );

}