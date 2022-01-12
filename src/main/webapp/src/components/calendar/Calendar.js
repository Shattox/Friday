import React, {useState, useContext, useEffect} from 'react';
import CalendarHeader from "./CalendarHeader";
import SideBar from "./SideBar";
import Month from "./Month";
import {getMonth} from "../../utils/date";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "./EventModal";
import DistanceMatrix from "./DistanceMatrix";


export default function Calendar({latitude, longitude}) {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const {monthIndex, showEventModal, savedEvents} = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);


    return (
        <React.Fragment>
            {savedEvents.length > 0 && savedEvents.at(0).startDate === new Date().toLocaleString().substring(0, 10)}
            {showEventModal && <EventModal />}
            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                    <SideBar />
                    <Month month={currentMonth}/>
                </div>
            </div>
        </React.Fragment>

    );
}


