import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root/Root";
import React from 'react';
import {ChoosePlace} from './routes/ChoosePlace/ChoosePlace'


let router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children:[
      {
        path: 'ChoosePlace',
        element: <ChoosePlace />
      }
    ]
  }
])

function App(){
  return <RouterProvider router={router} />
}

export default App