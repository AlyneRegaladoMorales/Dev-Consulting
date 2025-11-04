import { createBrowserRouter } from "react-router-dom";
import Item from "../page/Item";
import ListItem from "../page/ListItem";


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
