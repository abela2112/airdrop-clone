import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../userContext";
export default function LoginPage(){
    const {setUser}=useContext(UserContext)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [redirect,setRedirect]=useState(false)
    async function login(e){
       e.preventDefault()
       try {
        const {data}=await axios.post('/user/login',{
            email,
            password 
       })
    console.log(data)
    setUser(data)
    alert('login successful!!')
    setRedirect(true)
    }
       catch(err){
        alert('please try again')
        console.log(err)
       }
       //console.log(JSON.stringify({email,password}))
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(
        <div className="flex items-center justify-around grow ">
            <div className="mb-36">
            <h1 className="text-center text-2xl mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={login}>
            <input type="email" placeholder="your@email.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password"value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className="primary">Login</button>
            <div className="pt-2 text-center text-gray-500">
                don't have an account? <Link className="underline text-black" to={'/register'}>register</Link>
            </div>
        </form>
        </div>
        </div>
    )
}