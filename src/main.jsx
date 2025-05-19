import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Components/Root/Root.jsx';
import Home from './Components/Home/Home.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import AuthProvider from './Components/Firebase/AuthProvider.jsx';
import SignUp from './Components/Firebase/SignUp.jsx';
import SignIn from './Components/Firebase/Login.jsx';
import Login from './Components/Firebase/Login.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {index: true, Component:Home},
      {path: "signup", Component: SignUp},
      {path: "login", Component: Login},
    ]
  },
  {
    path: "*",
    Component: NotFound
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
