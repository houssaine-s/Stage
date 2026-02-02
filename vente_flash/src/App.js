import { Provider } from "react-redux";
import store from "./Redux/store";
import GetFlash from "./Redux/Components/GetFlash";
import VenteJrnl from "./Redux/Components/VenteJrnl";
import GetStock from "./Redux/Components/Stock";
import { Link, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import './NavBar.css';




export default function App() {

    return(
    <>
        <Provider store={store}>
            <div className="parent">
                <div className="navbar-container">
                    <NavBar />
                </div>
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<GetFlash />} />
                        <Route path="/GetFlash" element={<GetFlash />} />
                        <Route path="/VenteJrnl" element={<VenteJrnl />} />
                        <Route path="/GetStock" element={<GetStock />} />
                    </Routes>
                </div>
            </div>
            
        </Provider>

    </>
    )
}


