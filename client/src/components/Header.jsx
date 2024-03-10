import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../userContext"

export default function Header(){
  const {user}=useContext(UserContext)
    return(
       < header className="flex  justify-between ">
    <Link to={'/'} className="flex gap-1 items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
<span className="font-bold text-xl">airdnb</span>
    </Link>
  <div className="flex border border-gray-300 gap-2 rounded-full shadow-md shadow-gray-300 py-2 px-4">
    <div >Any Where</div>
    <div className="border-l border-gray-300"></div>
    <div>Any Week</div>
    <div className="border-r border-gray-300"></div>
    <div>Add guests </div>
    <button className="bg-primary text-white rounded-full p-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
</button>
  </div>

  </header>
    )
}