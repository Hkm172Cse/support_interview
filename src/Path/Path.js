import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";

const Path = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<h1>This is home page</h1>
            }
        ]
    }
]);

export default Path;