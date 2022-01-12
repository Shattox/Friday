import React, { useContext} from 'react';
import logo from "../../assets/logo.png"
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs';
import GlobalContext from "../../context/GlobalContext";

export default function CalendarHeader(){

    const {monthIndex, setMonthIndex} = useContext(GlobalContext);
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let year = new Date().getFullYear();
    function handlePrevMonth() {
       setMonthIndex(monthIndex-1);
    }

    function handleNextMonth() {
        if ((monthIndex+1) % 12 === 0) {
            year++;
        }
        setMonthIndex(monthIndex+1);

    }

    function handleReset(){
        setMonthIndex(new Date().getMonth())
    }
    return (
        <header className="px-4 py-2 flex items-center">
            <img src={logo} alt="logo calendar" className="mr-2 w-20 h-12"/>
            <h1 className="mr-10 text-xl text-gray-500 fond-bold">Friday Calendar</h1>
            <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">Today</button>
            <button onClick={handlePrevMonth}>
                <i className="material-icons-outlined cursor-pointer text-gray-600 mx-5"> <BsChevronLeft size={30}/> </i>
            </button>
            <button onClick={handleNextMonth}>
                <i className="material-icons-outlined cursor-pointer text-gray-600 mx-5"> <BsChevronRight size={30}/> </i>
            </button>
            <h2 className="ml-4 text-xl text-gray-500 fond-bold">
                {months[new Date(year, monthIndex).getMonth()]}
            </h2>
            <h2 className="ml-4 text-xl text-gray-500 fond-bold">
                {new Date(year, monthIndex).getFullYear()}
            </h2>
        </header>
    );

}
