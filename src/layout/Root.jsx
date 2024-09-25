import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="border-4 border-lime-700">
            <h1 className="text-3xl font-bold text-center bg-teal-400 py-3">User Management System</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;