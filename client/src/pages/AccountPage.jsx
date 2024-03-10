import { useContext, useState } from "react"
import { UserContext } from "../userContext"
import { Link, Navigate, useLocation, useParams } from "react-router-dom"
import axios from 'axios'
import PlacePage from "./placePage"
import AccountNav from "./AccountNav"
export default function AccountPage(){
   const {pathname}=useLocation()
    let subpage=pathname.split('/')[2]
    if (subpage===undefined){subpage='profile'}
    //console.log(subpage)
    const {ready,user,setUser}=useContext(UserContext)
    const [redirect,setRedirect]=useState(false)
    if(!ready){
        return "Loading....."
    }

    if(ready && !user && !redirect) return <Navigate to={'/login'}/>
    
    
    
    async function logout(){
        await axios.post('/account/logout')
        setRedirect(true)
        setUser(null)

    }
    if(redirect) return <Navigate to={'/'}/>
    return (
    <div><AccountNav/>
    {subpage==='profile' &&(
        <div className="max-w-lg mx-auto">
            <h2 className="text-center"> logged in as {user.name}</h2>
            <button onClick={logout}className="w-full bg-primary rounded-full text-white py-2 mt-2">logout</button>
        </div>
    )}
    {subpage==='place'&&(
        <PlacePage/>
    )}
    </div>)
}