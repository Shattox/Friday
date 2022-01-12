
import React, {useContext} from 'react';
import plusSvg from '../../assets/plus.svg';
import GlobalContext from "../../context/GlobalContext";


export default function CreateEventButton() {


    const {setShowEventModal} = useContext(GlobalContext);

    return (
      <button onClick={() => setShowEventModal(true)} className="border p-2 rounded-full flex items-center shadow-md hover:shadow-lg">
          <img src={plusSvg} alt="create event" className="w-10 h-7"/>
          <span className="pl-3 pr-7">Create event</span>
      </button>
    );
}