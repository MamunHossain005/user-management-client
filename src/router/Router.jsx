import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import AllUsers from "../pages/AllUsers/AllUsers";
import NewUser from "../pages/NewUser/NewUser";
import UpdateUser from "../pages/UpdateUser/UpdateUser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <AllUsers></AllUsers>,
                loader: () => fetch('http://localhost:5000/users'),
            },
            {
                path: '/new',
                element: <NewUser></NewUser>
            },
            {
                path: '/update/:id',
                element: <UpdateUser></UpdateUser>,
                loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
            }
        ]
    }
]);

export default router;