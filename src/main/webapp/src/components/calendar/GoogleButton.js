import React, {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";
import account from "../../assets/account.png";
import {getEventsFromApi} from "../../utils/Function";


export default function GoogleButton() {

    const {idMember, dispatchCallEvent, savedEvents} = useContext(GlobalContext);

    const onSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/SyncGoogle/"+idMember,
            {method: 'POST', headers: {"content-type": "application/json"}})
            .then(response => {
                response.json().then(resp => {
                    if (resp === 200) {
                        savedEvents.splice(0, savedEvents.length);
                        getEventsFromApi(idMember, dispatchCallEvent, "push");
                    }
                });
            });
    };

    return (
        <button onClick={onSubmit} className="border p-2 rounded-full flex items-center shadow-md hover:shadow-lg mt-2">
            <img src={account} alt="sync google account" className="w-7 h-7"/>
            <span className="pl-3 pr-7">Sync Google</span>
        </button>
    );
}