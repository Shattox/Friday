import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from "../context/GlobalContext";
import {buildEventDate} from "../utils/Function";

export default function SmartInformation() {
    const {savedEvents} = useContext(GlobalContext);
    const [today, setDate] = useState(new Date());
    let nextEventDate = null;
    let timeBeforeEvent;

    if (savedEvents.length !== 0) {
        let nextEvent = null;
        for (let i = 0; i < savedEvents.length; i++) {
            if (today < buildEventDate(savedEvents[i])) {
                nextEvent = savedEvents[i];
                break;
            }
        }
        if (nextEvent !== null) {
            nextEventDate = buildEventDate(nextEvent);
            timeBeforeEvent = new Date(Math.abs(today - nextEventDate))
            timeBeforeEvent.setHours(timeBeforeEvent.getHours() - 1);
            timeBeforeEvent = new Date(timeBeforeEvent).toLocaleTimeString('fr-FR', {
                hour: 'numeric',
                hour24: true,
                minute: 'numeric',
                second: 'numeric'
            });
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <div className="bg-gray-50">
            <div
                className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <span className="block text-indigo-600">
                        {nextEventDate !== null ?
                            nextEventDate > today ?
                                <span className="block">Next event in {timeBeforeEvent}</span>
                                : 'No event !' :
                            'No event !'}</span>
                </h2>
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                    <div className="inline-flex rounded-md shadow">
                        <p
                           className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600">
                            Info traffic
                        </p>
                    </div>
                    <div className="ml-3 inline-flex rounded-md shadow">
                        <p
                           className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600">
                            Info traffic
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}
