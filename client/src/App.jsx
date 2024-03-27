import { Route, Routes } from "react-router-dom"
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage"
import Layout from "./components/Layout"
import RegisterPage from "./pages/Register"
import axios from "axios"
import { UserContextProvider } from "./userContext"
import AccountPage from "./pages/AccountPage"
import PlacePage from "./pages/placePage"
import PlacesFormPage from "./pages/placesFormPage"
import SinglePlacePage from "./pages/SinglePlacePage"
import Bookings  from "./pages/Bookings"
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials=true;
axios.defaults.headers={
  'content-Type':'application/json','SameSite':'none','secure':false

}

function App() {

  return (
    <UserContextProvider>
      <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route  path="/register" element={<RegisterPage/>}/>
        <Route path="/account" element={<AccountPage/>}/>
      
        <Route path="/account/place" element={<PlacePage/>}/>
        <Route path="/account/place/new" element={<PlacesFormPage/>}/>
        <Route path="/account/place/:id" element={<PlacesFormPage/>}/>
        <Route path="/place/:id" element={<SinglePlacePage/>}/>
        <Route path="/account/booking" element={<Bookings/>}/>
        
        
        
        </Route>

      </Routes>
    </UserContextProvider>
  )
  
}

export default App
