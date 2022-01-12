import React, {useEffect, useMemo, useReducer, useState} from 'react';
import GlobalContext from "./GlobalContext";

function savedEventReducer(state, {type, payload}) {
    switch (type) {
        case "push":
            let is_present = false
            state.forEach(evt => is_present = evt.id === payload.id ? true : is_present);
            if (!is_present) {
                return [...state, payload]
            } else {
                return state
            }
        case "update":
            return state.map(evt => evt.id === payload.id ? payload : evt);
        case "delete":
            return state.filter(evt => evt.id !== payload.id);
        case "clear":
            return state.filter(_ => false);
        default:
            throw new Error();
    }
}


function initEvents() {
    const storageEvents = localStorage.getItem("savedEvents");
    return storageEvents ? JSON.parse(storageEvents) : [];
}

export default function ContextWrapper(props){
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [idMember, setIdMember] = useState(0);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [daySelected, setDaySelected] = useState(new Date());
    const [savedEvents, dispatchCallEvent] = useReducer(savedEventReducer, [], initEvents);
    const [labels, setLabels] = useState([]);

    const filteredEvents = useMemo(() => {
        return savedEvents.filter(evt =>
            labels
                .filter(lbl => lbl.checked)
                .map(lbl=> lbl.label)
                .includes(evt.label)
        )
    },[savedEvents, labels])

    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set(savedEvents.map(evt => evt.label) )].map(label => {
                const currentLabel = prevLabels.find(lbl => lbl.label === label);
                return {
                    label,
                    checked:currentLabel ? currentLabel.checked : true
                };
            });
        });
    }, [savedEvents]);

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal, setShowEventModal]);


    function updateLabel(label){
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl));
    }

    return (
      <GlobalContext.Provider value={{
          monthIndex,
          setMonthIndex,
          showEventModal,
          setShowEventModal,
          daySelected,
          setDaySelected,
          dispatchCallEvent,
          savedEvents,
          selectedEvent,
          setSelectedEvent,
          labels,
          setLabels,
          updateLabel,
          filteredEvents,
          idMember,
          setIdMember
      }}>
          {props.children}
      </GlobalContext.Provider>
    );
}