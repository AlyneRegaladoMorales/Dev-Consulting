import { createBrowserRouter } from "react-router-dom";
import Item from "../page/Item";
import ListItem from "../page/ListItem";
import CreateCharacter  from "../page/CreateCharacter";
import EditCharacter from "../page/EditCharacter";
import ListCustomItem from "../page/ListCustomItem";
import Dashboard from "../page/Dashboard";


const router = createBrowserRouter([
    {
        path: "/",
        element: <ListItem />,
    },
    {
        path: "/character/:id",
        element: <Item />,
    },
    {
        path: "/create",
        element: <CreateCharacter />,
    },
    {
        path: "/edit/:id",
        element: <EditCharacter />,
    },
    {
        path: "/custom",
        element: <ListCustomItem />,
    },
    {
    path: "/custom/:id",
    element: <Item isCustom />, 
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
])

export  { router };
