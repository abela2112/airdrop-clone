import axios from "axios";
import Perks from "./perks";
import UploadPhotos from "./photoUploader";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";


export default function PlacesFormPage(){
    const {id}=useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckout] = useState('')
    const [maxGuests, setMaxGuest] = useState(1)
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [price,setPrice]=useState(0)
    const [redirect, setRedirect] = useState(false)
    useEffect(()=>{
        if(id){
            axios.get(`/place/${id}`).then(({data})=>{
                setTitle(data.title)
                setAddress(data.address)
                setDescription(data.description)
                setCheckIn(data.checkIn)
                setCheckout(data.checkOut)
                setPerks(data.perks)
                setExtraInfo(data.extraInfo)
                setMaxGuest(data.maxGuests)
                setPrice(data.price)
            })
        }
    },[id])

    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>
    }
    function inputParagraph(text) {
        return <p className="text-gray-500 text-sm">{text}</p>

    }
    
    async function addPlace(ev) {
        ev.preventDefault()
        if(id){
            await axios.patch(`/place/${id}`,{
            title,
            description,
            address,
            checkIn,
            checkOut,
            maxGuests,
            perks,
            extraInfo,
            price
            })
        }
        else{
        await axios.post('/place', {
            title,
            description,
            address,
            addedPhotos,
            checkIn,
            checkOut,
            maxGuests,
            perks,
            extraInfo,
            price
        })}
        setRedirect(true)
    }

    function preInput(header, text) {
        return (
            <>
                {inputHeader(header)}
                {inputParagraph(text)}
            </>
        )
    }
    
    if (redirect) return <Navigate to={'/account/place'} />
    return(
        <div className="mt-4">
            <AccountNav/>
    
            <form onSubmit={addPlace}>
                {preInput('Title', 'title to this place')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title" />
                {preInput('Address', 'address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                {preInput('Photos', 'much=better')}
                <UploadPhotos addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                
                {preInput('Description', 'type description for this place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('perks', 'select all the perks')}
                <Perks selected={perks} onChange={setPerks} />  
                {preInput('extra info', 'house rules')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('checkIn &Out', 'enter check in and check out times')}
                <div className="grid grid-cols-4 gap-2">
                    <div><p>check-in time</p><input type="Number" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} /></div>
                    <div><p>check-out time</p><input value={checkOut} onChange={ev => setCheckout(ev.target.value)} type="Number" /></div>
                    
                    <div><p>max-number of guests</p><input value={maxGuests} onChange={ev => setMaxGuest(ev.target.value)} type="Number" /></div>
                    <div><p>prices of rooms per nights</p><input value={price} onChange={ev => setPrice(ev.target.value)} type="Number" /></div>
                
                </div>
                <button className="bg-primary w-full rounded-2xl py-2 text-white mt-2">save</button>
            </form>
        </div>
    )
}