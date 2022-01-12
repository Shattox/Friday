import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from "../context/GlobalContext";
import {buildEventDate} from "../utils/Function";

export default function Events() {
    const {savedEvents} = useContext(GlobalContext);
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Title
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Location
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Description
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Date (start/end)
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Hourly (start/end)
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Repeat
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {savedEvents
                                .map((event) => {
                                    if ((new Date().toLocaleString().substring(0, 10) === event.startDate) && (today < buildEventDate(event))) {
                                        return <tr key={event.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        {event.title}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{event.location}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{event.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{event.startDate}</div>
                                                <div className="text-sm text-gray-900">{event.endDate}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div
                                                    className="text-sm text-gray-900">{event.startHour}:{event.startMinute}:00
                                                </div>
                                                <div
                                                    className="text-sm text-gray-900">{event.endHour}:{event.endMinute}:00
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="text-sm text-gray-900">{event.repeat}</div>
                                            </td>
                                        </tr>
                                    } else {
                                        return <span/>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
