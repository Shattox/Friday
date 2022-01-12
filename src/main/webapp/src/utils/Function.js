export const deleteEvent = (id) => {
    fetch("http://localhost:8080/DeleteEvent/" + id,
        {method: "POST", headers: {"content-type": "application/json"}})
        .then(response => response.json());
}

export const getEventsFromApi = (idMember, dispatchCallEvent, type) => {
    fetch("http://localhost:8080/Events/" + idMember,
        {method: 'GET', headers: {"content-type": "application/json"}})
        .then(response => {
            response.json().then(events => {
                if (events != null) {
                    for (let i = 0; i < events.length; i++) {
                        if (typeof events[i].startDate == 'undefined') {
                            deleteEvent(events[i].id);
                        } else {
                            const startDate = new Date(events[i].startDate.substring(0, events[i].startDate.length - 5));
                            const endDate = new Date(events[i].endDate.substring(0, events[i].endDate.length - 5));
                            events[i].startHour = dateToFormat(startDate.getHours());
                            events[i].startMinute = dateToFormat(startDate.getMinutes());
                            events[i].endHour = dateToFormat(endDate.getHours());
                            events[i].endMinute = dateToFormat(endDate.getMinutes());
                            events[i].startDate = new Date(events[i].startDate.substring(0, 10)).toLocaleDateString();
                            events[i].endDate = new Date(events[i].endDate.substring(0, 10)).toLocaleDateString();
                            dispatchCallEvent({type: type, payload: events[i]});
                        }
                    }
                }
            });
        });
}

const dateToFormat = (date) => {
    return date.toString().length === 2 ? date : '0' + date;
}

export const buildEventDate = (event) => {
    const newDate = event.startDate.split('/');
    const dateToFormat = newDate[2] + '/' + newDate[1] + '/' + newDate[0];
    return new Date(dateToFormat + ' ' + event.startHour + ':' + event.startMinute + ':00');
}