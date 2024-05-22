import React, { useReducer } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Booking from "./Booking";
import { Routes, Route } from "react-router-dom";

const Main = () => {

    const seedRandom = function(seed){
        var m = 2**35 - 31;
        var a =185852;
        var s = seed % m;
        return function(){
            return (s = s * a % m) /m;
        }
    }

    const fetchAPI = function(date){
        let result = [];
        let random = seedRandom(date.getdate());
        for ( let i = 17; i <=23; i++) {
            if(random() < 0.5){
                result.push(i + ':00');
            }
            if(random() > 0.5){
                result.push(i + ':30');
            }
        }
        return result;
    }

    const submitAPI = function(formData){
        return true;
    }

    const intialState = {availbleTime: fetchAPI(new Date())};
    const [state, dispatch] = useReducer(updateTime, intialState);

    function updateTime(state, date){
        return{availbleTime:fetchAPI(new Date())}
    } 

    const navigate = useNavigate();
    function submitForm (formData){
        if(submitAPI(formData)){
            navigate("/confirmed");
        }
    }
    return(
        <main>
            <Routes>
                <Route path='/' element={<Header/>}/>
                <Route path='/booking' element={<Booking availbleTime={state} dispatch={dispatch} submitForm={submitForm}/>}/>
                <Route path='/confirmed' element={<cofirmedBooking/>}/>
            </Routes>
        </main>
    );
}

export default Main;