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
import { ColorModeSwitcher } from "./ColorModeSwitcher"

function NavigateFunctionComponent() {
    return null;
}

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
           {<NavigateFunctionComponent />}
            <Routes>

                {/*<Route path="/" element={<Dashboard/>}>*/}
                {/*    <Route path="/home" element={<Home></Home>}/>*/}
                {/*    <Route path="/staff" element={<StaffPage></StaffPage>}/>*/}
                {/*    <Route path="/members" element={<MembersTable></MembersTable>}/>*/}
                {/*    <Route path="/events" element={<ComingSoon></ComingSoon>}/>*/}
                {/*        <Route path="/members/:user_id" element={<MemberDashboard></MemberDashboard>}/>*/}

                {/*    <Route path="/events" element={<ComingSoon></ComingSoon>}/>*/}
                {/*    <Route path="/privacy" element={<PrivacyPolicy></PrivacyPolicy>}/>*/}
                {/*</Route>*/}

                {/*<Route path="*" element={<NotFound/>}/>*/}

            </Routes>
        </BrowserRouter>
  </ChakraProvider>
)
