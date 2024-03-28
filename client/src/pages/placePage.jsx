import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";
import axios from "axios";

export default function PlacePage() {
    const [placeData,setPlaceData]=useState([])
    useEffect(()=>{
        axios.get('/place').then(({data})=>{
           setPlaceData(data)
           //console.log(data)
        })
    },[])
    
    return (<>
    <AccountNav/>
        
            <div className="text-center">
                <Link to={'/account/place/new'} className="inline-flex py-2 px-4 bg-primary text-white rounded-full gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
    
                    Add new places</Link>
            </div>
            <div>
                {placeData.length>0 && placeData.map((place)=>(
                    <div key={place._id}className="mt-2 bg-gray-100 flex gap-2">
                        <div className="flex h-32 w-32 bg-gray-300 grow shrink-0 p-2">
                            {place.photos.length > 0 && (<img className="object-cover" src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${place.photos[0]}`} alt="" />
                        )}
                            </div>
                        
                        <Link to={`/account/place/${place._id}`} className="grow shrink cursor-pointer">
                            <h2 className="text-xl mb-1">{place.title}</h2>
                            <p>{place.description}</p>

                        </Link>
                        
                        </div>
                )
            
                )}
            </div>
            </>
        

    ); 
 }

