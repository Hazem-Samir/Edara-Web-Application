import React from 'react';
import ReactDOM from 'react-dom/client';
import './Frontend/styles/Table.css';
import './Frontend/styles/Form.css';
import './Frontend/styles/Login.css';
import './Frontend/styles/Header.css';
import reportWebVitals from './Frontend/reportWebVitals';

import { RouterProvider } from "react-router-dom";
import { routes } from "./Frontend/routes";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
