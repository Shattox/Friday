import React, {useContext, useEffect, useState} from 'react';
import Day from "./Day";
import GlobalContext from "../../context/GlobalContext";


export default function Month({month}) {

    const [repeatedEvents, setRepeatedEvents] = useState([]);
    const {filteredEvents} = useContext(GlobalContext);

    useEffect(() => {
        const repeatedEvents = [];
        filteredEvents.forEach(evt => {
            let eventCopy = {...evt};
            repeatedEvents.push({...eventCopy});
            const [day, month, year] = evt.startDate.split("/");
            const [endDay, endMonth, endYear] = evt.endDate.split("/");
            const endDate = new Date(parseInt(endYear), endMonth-1, parseInt(endDay));
            let startDate = new Date(year, month-1, day);

            switch (evt.repeat) {
                case 'DAILY':
                    while (startDate < endDate) {
                        startDate.setDate(startDate.getDate()+1);
                        eventCopy.startDate = startDate.toLocaleDateString();
                        repeatedEvents.push({...eventCopy});
                    }
                    break;
                case 'WEEKLY':
                    while (startDate < endDate) {
                        startDate.setDate(startDate.getDate()+7);
                        eventCopy.startDate = startDate.toLocaleDateString();
                        repeatedEvents.push({...eventCopy});
                    }
                    break;
                case 'MONTHLY':
                    while(startDate < endDate) {
                        startDate.setMonth(startDate.getMonth()+1);
                        eventCopy.startDate = startDate.toLocaleDateString();
                        repeatedEvents.push({...eventCopy});
                    }
                    break;
                case 'YEARLY':
                    while (startDate < endDate) {
                        startDate.setFullYear(startDate.getFullYear() + 1);
                        eventCopy.startDate = startDate.toLocaleDateString();
                        repeatedEvents.push({...eventCopy});
                    }
                    break;
                default:
                    break;
            }
        });
        setRepeatedEvents(repeatedEvents);
    }, [filteredEvents]);


    return (
     <div className="flex-1 grid grid-cols-7 grid-rows-5">
         {month.map((row, i) => (
             <React.Fragment key={i}>
                 {
                     row.map((day, index) => (
                         <Day day={day} key={index} rowIdx={i} repeatedEvents={repeatedEvents}/>
                     ))
                 }
             </React.Fragment>
         ))}
     </div>
    );

}