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
import {NotFound} from "./Components/Other/NotFound";

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
                    {/*<Route path="/staff" element={<StaffPage></StaffPage>}/>*/}
                    {/*<Route path="/members" element={<MembersTable></MembersTable>}/>*/}
                    {/*<Route path="/events" element={<ComingSoon></ComingSoon>}/>*/}
                    {/*    <Route path="/members/:user_id" element={<MemberDashboard></MemberDashboard>}/>*/}

                    {/*<Route path="/events" element={<ComingSoon></ComingSoon>}/>*/}
                    {/*<Route path="/privacy" element={<PrivacyPolicy></PrivacyPolicy>}/>*/}
                </Route>

                <Route path="*" element={<NotFound/>}/>

            </Routes>
        </BrowserRouter>
  </ChakraProvider>
)