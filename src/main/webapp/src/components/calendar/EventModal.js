import React, {useContext, useState} from "react";
import {
    MdBookmarkBorder,
    MdCheck,
    MdClose,
    MdDelete,
    MdDragHandle,
    MdLocationOn,
    MdSchedule,
    MdSegment, MdTitle
} from "react-icons/all";
import GlobalContext from "../../context/GlobalContext";
import TimePicker from "./TimePicker";
import {deleteEvent, getEventsFromApi} from "../../utils/Function";

export default function EventModal() {
    const {setShowEventModal, daySelected, dispatchCallEvent, selectedEvent, setSelectedEvent, idMember} = useContext(GlobalContext);

    const labelsClasses = [
        "indigo",
        "gray",
        "green",
        "blue",
        "red",
        "purple",
    ];
    const [allDay, setAllDay] = useState(selectedEvent ? selectedEvent.allDay : false);
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
    const [location, setLocation] = useState(selectedEvent ? selectedEvent.location : '');
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '');
    const [repeat, setRepeat] = useState(selectedEvent ? selectedEvent.repeat : "NEVER");
    const [endDate, setEndDate] = useState(selectedEvent ? selectedEvent.endDate : "00");
    const [startHour, setStartHour] = useState(selectedEvent ? selectedEvent.startHour : "01");
    const [endHour, setEndHour] = useState(selectedEvent ? selectedEvent.endHour :"01");
    const [startMinute, setStartMinute] = useState(selectedEvent ? selectedEvent.startMinute : "00");
    const [endMinute, setEndMinute] = useState(selectedEvent ? selectedEvent.endMinute : "00");
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );

    const onSubmit = (event) => {
        event.preventDefault();
        const dayStr = daySelected.toLocaleDateString()
            .replaceAll("/", "-")
            .split('-')
            .reverse()
            .join('-')
            + " " + startHour + ":" + startMinute + ":00";
        const newEnDate = endDate + " " + endHour + ":" + endMinute + ":00";
        if (selectedEvent) {
            fetch("http://localhost:8080/UpdateEvent/"+ selectedEvent.id + "&" + title + "&" + description + "&"+ dayStr + "&" + newEnDate + "&" +
                location + "&" + idMember + "&" + allDay + "&" + repeat + "&" + selectedLabel,
                {method: 'POST', headers: {"content-type": "application/json"}})
                .then(response => {
                    response.json().then(resp => {
                        if (resp === 200) {
                            getEventsFromApi(idMember, dispatchCallEvent, "update",);
                            setShowEventModal(false);
                        }
                    });
                });
        }else {
            fetch("http://localhost:8080/SaveEvent/" + title + "&" + description + "&"+ dayStr + "&" + newEnDate + "&" +
                location + "&" + idMember + "&" + allDay + "&" + repeat + "&" + selectedLabel,
                {method: 'POST', headers: {"content-type": "application/json"}})
                .then(response => {
                    response.json().then(resp => {
                        if (resp === 200) {
                            getEventsFromApi(idMember, dispatchCallEvent, "push");
                            setShowEventModal(false);
                        }
                    });
                });
        }

    };

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/2" onSubmit={onSubmit}>
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                  <span className="material-icons-outlined text-gray-400">
                      <MdDragHandle/>
                  </span>
                    {selectedEvent && (
                        <span onClick={() => {
                            dispatchCallEvent({type: "delete", payload: selectedEvent});
                            setShowEventModal(false);
                            setSelectedEvent(null);
                            deleteEvent(selectedEvent.id);
                        }} className="material-icons-outlined text-gray-400 cursor-pointer">
                          <MdDelete/>
                        </span>
                    )}
                    <div>
                        <button onClick={() => {setShowEventModal(false); setSelectedEvent(null)}}>
                        <span className="material-icons-outlined text-gray-400">
                          <MdClose/>
                        </span>
                        </button>
                    </div>

                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">

                        {/* SELECTED DAY */}
                        <span className="material-icons-outlined text-gray-400 mr-8">
                          <MdSchedule size={25}/>
                        </span>
                        <p>{daySelected.toDateString()}</p>

                        {/* TITLE */}
                        <span className="material-icons-outlined text-gray-400 mr-8">
                          <MdTitle size={25}/>
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="pt-3 border-0 text-gray-600 text-xl font-medium pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus:border-blue-500"
                            required
                        />

                        {/* Location */}
                        <span className="material-icons-outlined text-gray-400 mr-8">
                          <MdLocationOn size={25}/>
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="pt-3 border-0 text-gray-600 text-xl font-medium pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus:border-blue-500"
                            required
                        />

                        {/* ALL DAY */}
                        <span className="text-gray-400 mr-8">
                          <p>All day</p>
                        </span>
                        <div
                            className={"md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1" +
                            "cursor-pointer " + (allDay ? "bg-blue-500" : "bg-gray-300")}
                            onClick={() => {
                                setAllDay(!allDay);
                            }}
                        >
                            <div
                                className={"bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md" +
                                "transform" + (allDay ? " transform translate-x-7" : null)}
                            >
                            </div>
                        </div>

                        {/* DATE PICKER */}
                        <span className="text-gray-400 mr-8">
                          <p>Starts</p>
                        </span>
                        <div>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div className={"flex"}>
                                    <p className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {daySelected.toLocaleString().substring(0, 10)}
                                    </p>
                                    {!allDay ? <TimePicker hour={startHour} setHour={setStartHour} minute={startMinute} setMinute={setStartMinute}/> : <div/>}
                                </div>
                            </div>
                        </div>
                        <span className="text-gray-400 mr-8">
                          <p>Ends</p>
                        </span>
                        <div>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div className={"flex"}>
                                    <input name="end" type="date"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           value={endDate === "00" ? daySelected.toLocaleString().substring(0, 10) : endDate.toLocaleString().substring(0, 10)}
                                           onChange={(date) => setEndDate(date.target.value)}
                                           required
                                    />
                                    {!allDay ? <TimePicker hour={endHour} setHour={setEndHour} minute={endMinute} setMinute={setEndMinute}/> : <div/> }
                                </div>
                            </div>
                        </div>

                        {/* REPEAT */}
                        <span className="text-gray-400 mr-8">
                          <p>Repeat</p>
                        </span>
                        <div>
                            <div className="flex h-10 w-28 bg-white rounded-lg bg-gray-50 border border-gray-300">
                                <select name="repeat"
                                        className="text-center cursor-pointer hover:text-blue-600 bg-transparent text-l appearance-none outline-none mr-4"
                                        onChange={(e) => setRepeat(e.target.value)}
                                >
                                    <option className={"text-gray-600"} value="NEVER" selected={repeat === "NEVER" ? "selected" : null }>Never</option>
                                    <option className={"text-gray-600"} value="DAILY" selected={repeat === "DAILY" ? "selected" : null }>Every Day</option>
                                    <option className={"text-gray-600"} value="WEEKLY" selected={repeat === "WEEKLY" ? "selected" : null } >Every Week</option>
                                    <option className={"text-gray-600"} value="MONTHLY" selected={repeat === "MONTHLY" ? "selected" : null }>Every Month</option>
                                    <option className={"text-gray-600"} value="YEARLY" selected={repeat === "YEARLY" ? "selected" : null }>Every Year</option>
                                </select>
                            </div>
                        </div>
                        {/* DESCRIPTION */}
                        <span className="material-icons-outlined text-gray-400 mr-8">
                          <MdSegment size={25}/>
                        </span>
                        <input
                            type="text"
                            name="title"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus-ring-0 focus:border-blue-500"
                        />

                        {/* COLOR PICKER */}
                        <span className="material-icons-outlined text-gray-400 mr-8">
                          <MdBookmarkBorder size={25}/>
                        </span>
                        <div className="flex gap-x-2">
                            {labelsClasses.map((lblClass, i) => (
                                <span
                                    key={i}
                                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                    onClick={() => setSelectedLabel(lblClass)}
                                >
                                  {selectedLabel === lblClass &&
                                  <span className="material-icons-outlined text-white text-sm">
                                      <MdCheck size={15}/>
                                  </span>}

                              </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue px-6 py-2 rounded text-white">
                        <p>Save</p>
                    </button>
                </footer>
            </form>
        </div>
    );
}