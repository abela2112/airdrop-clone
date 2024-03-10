import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
export default function RegisterPage(){
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [redirect,setRedirect]=useState(false)
async function register(e){
  e.preventDefault()
  try{
    axios.post('/user/register',{
    name,
    email,
    password

  })
  alert('register successfully !!')
  setRedirect(true)
}
catch(err){
  alert('please try again')
  console.log(err)
}
// try
// {
//   const response=await fetch('http://localhost:4000/register',{
//             method:'POST',
//             body:JSON.stringify({name,email,password}),
//             headers:{'content-Type':'application/json','SameSite':'none','secure':false},
//             credentials:'include'
         
//        })
//        if(response.ok)
//        {
//     //setUser(response.data)
//     alert('register successfully !!')
//     setRedirect(true)
//     }
//   }
  
  

}
if(redirect){
    return <Navigate to={'/login'}/>
}
    return(
        <div className="flex items-center justify-around grow ">
            <div className="mb-36">
            <h1 className="text-center text-2xl mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={register}>
            <input type="text" placeholder="yourname" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder="your@email.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className="primary">Register</button>
            <div className="pt-2 text-center text-gray-500">
                Allready a member <Link className="underline text-black" to={'/login'}>login</Link>
            </div>
        </form>
        </div>
        </div>
    )
}