import { useEffect, useState } from "react"

import AccountNav from "./AccountNav"
import axios from "axios"

export default function Bookings(){
    
    const [booking,setBooking]=useState([])
    useEffect(()=>{
        axios.get('account/booking/bookPlace').then(({data})=>{
            setBooking(data)
        })
    },[])
   
    return(
        <div className="p-4">
            <AccountNav/>
            {booking.length>0 && booking.map((booking)=>(
                <div key={booking._id} className="flex gap-2 mb-2 rounded-2xl w-full overflow-hidden bg-gray-100">
                    <div className="w-48">
                        <img src={`http://127.0.0.1:4000/uploads/${booking.place.photos[0]}`}  alt="" />
                    </div>
                    <div className="bg-gray-100">
                        <div>{booking.checkIn}</div>
                        <div>{booking.checkOut}</div>
                    </div>
                </div>

            ))}
        </div>
    )
}