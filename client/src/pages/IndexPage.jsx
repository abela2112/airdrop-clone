import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setplaces] = useState([])
    useEffect(() => {
        axios.get('/home-place').then(({ data }) => {

            setplaces([...data])
        })
    }, [])
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mt-4">
            {places.length > 0 && places.map((place) => (
                <Link to={`/place/${place._id}`} key={place._id}>
                    <div className="flex mb-2">
                        <img className="rounded-2xl object-cover aspect-square" src={'http://127.0.0.1:4000/uploads/' + place.photos[0]} />
                    </div>
                    <h2 className="font-bold">{place.address}</h2>
                    <h3 className="text-sm truncate text-gray-500">{place.title}</h3>

                    <div className="mt-1">
                        <span className="font-bold">${place.price}</span> per  night
                    </div>

                </Link>

            )

            )}
        </div>


    );
}