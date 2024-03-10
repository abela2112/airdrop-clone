import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AccountNav from "./AccountNav"

export default function Booking(){
    const {id}=useParams()
    const [booking,setBooking]=useState(null)
    useEffect(()=>{
        axios
    },[id])
   
    return(
        <div>
            <AccountNav/>
        </div>
    )
}