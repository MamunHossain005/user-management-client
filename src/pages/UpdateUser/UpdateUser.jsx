import { Link, useLoaderData } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";
import { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const UpdateUser = () => {
    const loadedUser = useLoaderData();
    const [genderOpt, setGender] = useState('Male');
    const [statusOpt, setStatus] = useState('Active');
    const MySwal = withReactContent(Swal);

    const onGenderChange = e => {
        setGender(e.target.value);
    }

    const onStatusChange = e => {
        setStatus(e.target.value);
    }

    const handleUpdateUser = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = genderOpt;
        const status = statusOpt;
        const newUser = {name, email, gender, status};

        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                MySwal.fire({
                    icon: 'success',
                    title: 'Success!!!',
                    text: 'User Updated successfully',
                    color: 'green',
                    confirmButtonColor: 'green',
                    confirmButtonText: 'Ok',
                })
                form.reset();
            }
        })
    }

    return (
        <div className="max-w-6xl mx-auto py-16">
        <Link to={'/'}><button className="flex items-center gap-2 px-3 py-2 shadow-lg"><FaAnglesLeft />All Users</button></Link>
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium text-center">Update a Existing User</h2>
            <p className="font-medium text-gray-400 text-center">Use the below form to update a Exiting account</p>
            <form className="mt-8" onSubmit={handleUpdateUser}>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 ps-1 font-bold text-gray-500 text-lg">Name</label>
                    <input type="text" name="name" defaultValue={loadedUser.name} id="name" placeholder="Name" className="border w-full ps-3 py-2 rounded-lg outline-0 shadow-md" />
                </div>
                <div className="mb-8">
                    <label htmlFor="email" className="block mb-1 ps-1 font-bold text-gray-500 text-lg">Email</label>
                    <input type="email" name="email" defaultValue={loadedUser.email} id="email" placeholder="Email" className="border w-full ps-3 py-2 rounded-lg outline-0 shadow-md" />
                </div>
                <div className="flex items-center gap-5">
                    <p className="font-bold text-gray-500 text-lg mr-8">Gender</p>
                    <div className="flex items-center">
                        <input type="radio" name="gender" value="Male" id="male" onChange={onGenderChange} className="radio radio-accent mr-1" defaultChecked/>
                        <label htmlFor="male" className="font-medium">Male</label>
                    </div>
                    <div className="flex items-center">
                        <input type="radio" name="gender" value="Female" id="female" onChange={onGenderChange} className="radio radio-accent mr-1" />
                        <label htmlFor="female" className="font-medium">Female</label>
                    </div>
                    <div className="flex items-center">
                        <input type="radio" name="gender" value="Others" id="other" onChange={onGenderChange} className="radio radio-accent mr-1" />
                        <label htmlFor="other" className="font-medium">Others</label>
                    </div>
                </div>
                <div className="flex items-center gap-5 mt-4">
                    <p className="font-bold text-gray-500 text-lg mr-10">Status</p>
                    <div className="flex items-center">
                        <input type="radio" name="status" value="Active" id="active" onChange={onStatusChange} className="radio radio-accent mr-1" defaultChecked/>
                        <label htmlFor="active" className="font-medium">Active</label>
                    </div>
                    <div className="flex items-center">
                        <input type="radio" name="status" value="Inactive" id="inactive" onChange={onStatusChange} className="radio radio-accent mr-1" />
                        <label htmlFor="inactive" className="font-medium">Inactive</label>
                    </div>
                </div>
                <button type="submit" className="mt-8 text-lg font-bold text-center w-full btn btn-accent text-gray-800">Update</button>
            </form>
        </div>
    </div>
    );
};

export default UpdateUser;