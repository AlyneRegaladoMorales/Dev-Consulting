import { createBrowserRouter } from "react-router-dom";
import Item from "../components/Item";
import ListItem from "../components/listItem";


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
