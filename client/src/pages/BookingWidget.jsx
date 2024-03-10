import { useContext, useState } from "react"
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from '../userContext'
export default function BookingWidget({place}){
    
    const [checkIn,setCheckIn]=useState('')
    const [checkOut,setCheckOut]=useState('')
    const [maxGuests,setMaxGuests]=useState(0)
    const [name,setName]=useState('')
    const [phoneNum,setPhoneNum]=useState('')
    const [redirectToBooking,setRedirectToBooking]=useState(false)
    const [redirectToLogin,setRedirectToLogin]=useState(false)
    const {user}=useContext(UserContext)
    
    let numberOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
    async function bookPlace(ev){
        ev.preventDefault()
        if(user){
            await axios.post('account/booking/bookPlace',{
                name,
                phoneNum,
                checkIn,checkOut,
                maxGuests,
                place:place._id,
                price:numberOfNights*place.price
            })
            setRedirectToBooking(true)
        }
     else{
        alert('please login ')
        setRedirectToLogin(true)
     }
        
        
        
    }
    // if(user){
    //     setName(user.name)
    // }
    if(redirectToBooking) return <Navigate to={`/account/booking`}/>
    if(redirectToLogin) return <Navigate to={'/login'}/>
    return(
        <div className="border bg-white rounded-2xl shadow">
            <div className="text-center text-2xl font-bold p-2">price:${place.price} per night</div>
            <div className="rounded-2xl overflow-hidden border m-2">
                <div className="flex border">
                <div className=" px-4 py-2">
                <label>check-in</label>
                    <input type="date" value={checkIn} onChange={(ev)=>setCheckIn(ev.target.value)}/>
                </div>
                <div className="border"></div>
                <div className=" px-4 py-2">
                     <label>check-out</label>
                    <input type="date" value={checkOut} onChange={(ev)=>setCheckOut(ev.target.value)}/>
                </div>
                </div>
                <div className="border px-4 py-2 flex gap-2">
                    <label>number of guests</label>
                    <input type="number" value={maxGuests} onChange={(ev)=>setMaxGuests(ev.target.value)}/>
                </div>
            </div>
            {/* {numberOfNights>0 &&(
                <div><div className="border px-4 py-2 flex gap-2">
                <input type="text" value={name} onChange={(ev)=>setName(ev.target.value)} placeholder="your name"/>
            </div>
            <div className="border px-4 py-2 flex gap-2">
            
            <input type="tel" value={phoneNum} onChange={(ev)=>setPhoneNum(ev.target.value)} placeholder="phone number" />
        </div>

        </div>  )} */}
            <button onClick={bookPlace} className="bg-primary rounded-full w-full mt-3  p-2 text-white">
                Book this place
            </button>
        </div>
    )
}