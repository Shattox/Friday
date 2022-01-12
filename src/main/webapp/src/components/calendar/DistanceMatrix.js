import {useContext, useEffect, useState} from "react";
import GlobalContext from "../../context/GlobalContext";


export default function DistanceMatrix({latitude, longitude}) {

    const [bicycleDuration, setBicycleDuration] = useState("");
    const [carDuration, setCarDuration] = useState("");
    const [distance, setDistance] = useState("");
    const {savedEvents} = useContext(GlobalContext);
    const localisation = savedEvents.at(0).location;

    useEffect( () => {

        fetch("http://localhost:8080/fetchData/"+latitude+"&"+longitude+"&"+localisation+"&bicycling",
            {method: 'POST', headers: {"content-type": "application/json"}})
            .then(response => {
                response.json().then(resp => {
                    console.log(resp);
                    if (resp !== null) {
                        console.log(resp);
                    }
                });
            });
    }, [savedEvents, latitude, longitude, localisation]);

    return (
        <div className="bg-indigo-600">
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-indigo-800">
            </span>
                <p className="ml-3 font-medium text-white truncate">
                    <span className="md:hidden">Smart intel !</span>
                    <span className="hidden md:inline">You 're {distance} away from {localisation}</span><br />
                    <span className="hidden md:inline">You 'll need {bicycleDuration} to reach {localisation} at foot</span><br />
                    <span className="hidden md:inline">You 'll need {carDuration} to reach {localisation} with a car</span><br />
                </p>
                    </div>
                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button
                            type="button"
                            className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                        >
                            <span className="sr-only">Dismiss</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}