import Products from "./Pages/Admin/Products";
import RequestsHistory from "./Pages/Admin/Requests History";
import SupervisorsManagement from "./Pages/Admin/Supervisors Management";
import SupervisorsRequests from "./Pages/Admin/Supervisors Requests";
import WarehousesManagement from "./Pages/Admin/Warehouses Management";
import App from "./App";
import AdminNavBar from "./Components/Admin NavBar";
import Login from "./Login";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MyProducts from "./Pages/Supervisor/My Products";
import MyRequestsHistory from "./Pages/Supervisor/My Requests History";
import SupervisorNavBar from "./Components/Supervsior NavBar";
export const routes = createBrowserRouter([

    {
        path: "",
        element: <App />,
        children: [
         {
            path: "/",
            element: <Login />,
         },
            {
                path: "A",
                children: [
                    {
                        path: "Home",
                        element: <><AdminNavBar /><SupervisorsRequests /></>,
                    },
                    {
                        path: "Requests History",
                        element: <><AdminNavBar /><RequestsHistory /></>,
                    },
                    {
                        path: "Supervisors Management",
                        element: <><AdminNavBar /><SupervisorsManagement /></>,
                    },
                    {
                        path: "Warehouses Management",
                        element: <><AdminNavBar /><WarehousesManagement /></>,
                    },
                    {
                        path: "Warehouse",
                        children: [
                            {
                                path: ":wid/products",
                                element: <><AdminNavBar /><Products /></>,
                            },
                        ],
                    },
                ],
            },
            {
                path: "S",
                children: [
                    {
                        path: "Home",
                        element: <><SupervisorNavBar /><MyProducts /></>,
                    },
                    {
                        path: "My Requests History",
                        element: <><SupervisorNavBar /><MyRequestsHistory /></>,
                    },                   
                ],
            },
            
                            ],
                        },
                        {
        path: "*",
        element: <Navigate to={"/"} />,
    },
            
]);