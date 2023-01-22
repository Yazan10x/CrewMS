import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { ColorModeSwitcher } from "./Components/Dashboard/ColorModeSwitcher"
import {Dashboard} from "./Components/Dashboard/Dashboard";
import {Home} from "./Components/Home/Home";
import {HealthReport} from "./Components/HealthReport/HealthReport";
import {IncidentReport} from "./Components/IncidentReport/IncidentReport";
import {NotFound} from "./Components/Other/NotFound";
import {MembersTable} from "./Components/Crew/MembersTable";
import {MemberDashboard} from "./Components/Crew/MemberDashboard";
import {MembersHealthTable} from "./Components/HealthReport/MembersTable";
import {HealthTable} from "./Components/HealthReport/HealthTable";

function NavigateFunctionComponent() {
    return null;
}

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
           {<NavigateFunctionComponent />}
            <Routes>

                <Route path="/" element={<Dashboard></Dashboard>}>
                    <Route path="/home" element={<Home></Home>}/>
                    <Route path="/incident_report" element={<IncidentReport></IncidentReport>}/>
                    <Route path="/health_report" element={<HealthReport></HealthReport>}/>
                    {/*<Route path="/staff" element={<StaffPage></StaffPage>}/>*/}
                    <Route path="/crew" element={<MembersTable></MembersTable>}/>
                        <Route path="/crew/:user_id" element={<MemberDashboard></MemberDashboard>}/>
                    {/*<Route path="/events" element={<ComingSoon></ComingSoon>}/>*/}
                    {/*    <Route path="/members/:user_id" element={<MemberDashboard></MemberDashboard>}/>*/}

                    {/*<Route path="/events" element={<ComingSoon></ComingSoon>}/>*/}
                    {/*<Route path="/privacy" element={<PrivacyPolicy></PrivacyPolicy>}/>*/}
                </Route>

                <Route path='/doctor'>
                    <Route path="/health_report" element={<HealthReport></HealthReport>}></Route>
                    <Route path="/health_report/users" element={<MembersHealthTable></MembersHealthTable>}></Route>
                    <Route path="/health_report/users/:user_id" element={<HealthTable></HealthTable>}></Route>
                </Route>

                <Route path="*" element={<NotFound/>}/>

            </Routes>
        </BrowserRouter>
  </ChakraProvider>
)
