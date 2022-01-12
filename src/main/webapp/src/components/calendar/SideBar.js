import React, {useContext} from 'react';
import Labels from "./Labels";
import CreateEventButton from "./CreateEventButton";
import GlobalContext from "../../context/GlobalContext";
import GoogleButton from "./GoogleButton";
import {getEventsFromApi} from "../../utils/Function";

// url '/' are replace by '-' because fetch will
// understand it as real url and will find it.
export default function SideBar() {
    let url = "";
    const {idMember, savedEvents, dispatchCallEvent} = useContext(GlobalContext);

    const onSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/CalendarUrl/" + url + "&" + idMember,
            {method: 'POST', headers: {"content-type": "application/json"}})
            .then(response => response.json().then(resp => {
                if (resp === 200) {
                    savedEvents.splice(0, savedEvents.length);
                    getEventsFromApi(idMember, dispatchCallEvent, "push");
                    console.log(savedEvents)
                }
            }));
    }

    return (
        <aside className="border p-5 w-64">
            <CreateEventButton/>
            <GoogleButton/>
                <form onSubmit={onSubmit}>
                    <input id="url" type="text" name="url" placeholder="https://...calendar.ics"
                           className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100
                           focus:text-gray-500 focus:outline-none focus:border-gray-200"
                           onChange={(e) => url = (e.target.value).replaceAll("/", "-")}
                            required/>
                    <button className="hover:text-indigo-800" type="submit">
                        Submit
                    </button>
                </form>
            <Labels/>
        </aside>
    );
}