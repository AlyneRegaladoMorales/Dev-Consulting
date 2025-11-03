import { createBrowserRouter } from "react-router-dom";
import ListItem from "../components/ListItem";
import Item from "../components/Item";


const router = createBrowserRouter([
    {
        path: "/",
        element: <ListItem />,
    },
    {
        path: "/character/:id",
        element: <Item />,
    },
])

export  { router };
