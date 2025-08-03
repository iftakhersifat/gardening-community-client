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
import Login from './Components/Firebase/Login.jsx';
import SignUp from './Components/Firebase/SignUp.jsx';
import AuthProvider from './Components/Firebase/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import Explore from './Components/Root/Explore.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import ShareTip from './Components/private/ShareTip.jsx';
import BrowseTips from './Components/private/BrowseTips.jsx';
import TipDetails from './Components/private/TipDetails.jsx';
import MyTips from './Components/private/MyTips.jsx';
import UpdateTip from './Components/private/UpdateTip.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {index: true, Component: Home},
      {path: "signup", Component: SignUp},
      {path: "login", Component: Login},
      { path: "explore", Component: Explore},
      {path: "share", Component: ShareTip},
      {path: "browse", Component: BrowseTips},
      {path: "tip-details/:id", Component: TipDetails},
      {path: "my-tips", Component: MyTips},
      {path: "update-tip/:id",
        loader: ({ params }) => fetch(`https://gardening-resource-hub-server.vercel.app/garden-tips/${params.id}`),
       Component: UpdateTip},
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
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
