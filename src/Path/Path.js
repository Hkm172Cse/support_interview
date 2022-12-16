import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Pages/Home/Home/Home";
import List from "../Components/Pages/List/List";
import Main from "../Layout/Main/Main";

const Path = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/list',
                element:<List/>
            }
        ]
    }
]);

export default Path;