import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user || {};
    const [first_Name, setFirstName] = useState(firstName);
    const [last_Name, setLastName] = useState(lastName);
    const [photo_Url, setPhotoUrl] = useState(photoUrl);
    const [age_, setAge] = useState(age || "");
    const [gender_, setGender] = useState(gender);
    const [about_, setAbout] = useState(about);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);


    const dispatch = useDispatch();


    const saveProfile = async () => {
        try {
            setError("");
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName: first_Name,
                lastName: last_Name,
                photoUrl: photo_Url,
                age: age_,
                gender: gender_,
                about: about_
            }, {
                withCredentials: true
            });
            dispatch(addUser(res.data.data));
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false);
            }, 3000)
            console.log("response after saving profile", res);

        } catch (error) {
            setError(error?.response?.data);
            console.error("Error occurred while saving profile:", error);
        }
    }

    return (
        <>
            <div className='flex justify-center gap-10  my-10'>
                <div className='flex justify-center'>
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit profile</h2>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input
                                        type="text"
                                        className="input my-2 px-1"
                                        value={first_Name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        className="input my-2 px-1"
                                        value={last_Name}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Photo Url</legend>
                                    <input
                                        type="text"
                                        className="input my-2 px-1"
                                        value={photo_Url}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input
                                        type="number"
                                        className="input my-2 px-1"
                                        value={age_}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <input
                                        type="text"
                                        className="input my-2 px-1"
                                        value={gender_}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">About</legend>
                                    <textarea
                                        className="textarea my-2 px-1"
                                        placeholder="Bio"
                                        value={about_}
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </fieldset>

                            </div>
                            {error && <p className="text-error">{error}</p>}
                            <div className="card-actions justify-center">
                                <button
                                    className="btn bg-sky-600 border-sky-800 text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-400 px-5"
                                    onClick={saveProfile}
                                >Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName: first_Name, lastName: last_Name, about: about_, photoUrl: photo_Url, age: age_, gender: gender_ }} />
            </div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>}

        </>

    )
}

export default EditProfile