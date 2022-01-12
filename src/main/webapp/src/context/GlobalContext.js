import React from 'react';

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    daySelected: null,
    setDaySelected: (day) => {},
    dispatchCallEvent: ({type, payload}) => {},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {},
    labels: [],
    setLabels: () => {},
    updateLabel: () => {},
    filteredEvents: [],
    idMember: 0,
    setIdMember: (id) => {}
});

export default GlobalContext;