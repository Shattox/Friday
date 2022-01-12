import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import {getEventsFromApi} from "../utils/Function";

function SignIn({ onLoggedInChange }) {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failure, setFailure] = useState("");

    const {dispatchCallEvent, setIdMember} = useContext(GlobalContext);

    const onSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:8080/SignIn/" + email + "&" + password,
            {method: 'POST', headers: {"content-type": "application/json"}})
            .then(response => {
                if (response.status !== 500) {
                    response.json().then(member => {
                        setIdMember(member.id);
                        getEventsFromApi(member.id, dispatchCallEvent, "push");
                        onLoggedInChange(true);
                        history.push('/');
                    })
                } else {
                    setFailure("Your email or your password is wrong ! Please try again !");
                }
            });
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="grid place-items-center mx-2 my-20 sm:my-auto">
                <p className={"text-red-600"}>{failure}</p>
                <div
                    className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
                    <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Sign In</h2>
                    <form className="mt-10" onSubmit={onSubmit}>
                        <label htmlFor="email"
                               className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                        <input id="email" type="email" name="email" placeholder="e-mail address" autoComplete="email"
                               onChange={(e) => setEmail(e.target.value)}
                               className="block w-full py-3 px-1 mt-2
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                               required/>
                        <label htmlFor="password"
                               className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                        <input id="password" type="password" name="password" placeholder="password"
                               autoComplete="current-password"
                               onChange={(e) => setPassword(e.target.value)}
                               className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                               required/>
                        <button type="submit"
                                className="w-full py-3 mt-10 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none bg-indigo-600 hover:bg-indigo-800 hover:shadow-none">
                            Login
                        </button>
                        <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                            <Link to="/SignUp" className="flex-2 hover:text-indigo-600 underline">
                                Create an Account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;