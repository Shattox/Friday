import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from "../../context/GlobalContext";

export default function Day({day, _, rowIdx, repeatedEvents}) {
    
    const [dayEvents, setDayEvents] = useState([]);
    const {setDaySelected, setShowEventModal, setSelectedEvent, labels} = useContext(GlobalContext);

    useEffect(() => {
        const events = repeatedEvents.filter(evt => {
            return evt.startDate === day.toLocaleString().split(",")[0];
        });

        setDayEvents(events);

    }, [labels, repeatedEvents, day]);


    
    function displayCurrentDate(){
        const today = new Date()
         return day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear()
             ? 'bg-blue-500 text-white rounded-full w-4/5 ' : '';
    }



    return (
        <div className="border border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && (<p className="text-sm mt-1">{day.toDateString().split(" ")[0].toUpperCase()}</p>)}
                <p className={`text-sm p-1 my-1 text-center ${displayCurrentDate()}`}>
                    {day.getDate()}
                </p>
            </header>
            <div className="flex-1 cursor-pointer" onClick={() => {
                setDaySelected(day);
                setShowEventModal(true);
            }}>
                {dayEvents.map((evt, index) => (
                    <div onClick={() => setSelectedEvent(evt)} key={index} className={`bg-${evt.label}-200 p-1 m-3 text-gray-600 text-sm rounded mb-1 truncate flex items-center`}>
                        {evt.title}
                    </div>
                ))}

            </div>
        </div>
    );
};