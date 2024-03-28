import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout(){
    return(
        <div className="md:container md:mx-auto flex flex-col min-h-screen">
        <Header/>
        <Outlet/>
        </div>
    )
}