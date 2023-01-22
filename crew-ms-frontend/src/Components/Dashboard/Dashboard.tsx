import * as React from "react"
import {} from '@chakra-ui/react'
import {
    FiHome,
    FiCompass,
    FiStar,
    FiThumbsUp,
    FiAlertOctagon,
    FiBook,
    FiBookOpen,
    FiActivity
  } from 'react-icons/fi';
import { useLocation, useNavigate } from "react-router-dom"
import {NavBar} from "./NavigiationBar";
import {DocNavBar} from "./DoctorNavigiationBar";


export const Dashboard: React.FC = (props) =>  {
    let navigate = useNavigate();
    const location = useLocation();
    React.useEffect(() => {
        if (location.pathname == "/"){
            navigate("/home");

        } else if (location.pathname == "/doctor") {
            navigate("/doctor/home")
        }
    },[])

    if (location.pathname == "/doctor") {
        return (
        <>
            {<DocNavBar></DocNavBar>}
        </>
    )
    } else {
        return (
        <>
            {<NavBar></NavBar>}
        </>
    )
    }
}
