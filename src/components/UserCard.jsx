import React from 'react'

const UserCard = ({ user }) => {
    const {
        firstName = "",
        lastName = "",
        about = "",
        photoUrl = "",
        age = "",
        gender = ""
    } = user || {};

    const ageGender = [age, gender].filter(Boolean).join(" ");

    return (
        <div className="card bg-base-300 w-96 shadow-sm rounded-lg overflow-hidden">
            <figure>
                <img
                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt="Shoes"
                    className="w-full h-56 object-cover"
                />
            </figure>
            <div className="card-body bg-base-300 text-slate-900">
                <h2 className="card-title">{`${firstName} ${lastName}`.trim()}</h2>
                {ageGender && <p>{ageGender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button
                        className="btn bg-violet-600 border-violet-600 text-white font-semibold rounded-md px-4 py-2 shadow-lg hover:bg-violet-700 focus:ring-2 focus:ring-violet-300"
                    >
                        Ignore
                    </button>
                    <button
                        className="btn bg-pink-600 border-pink-600 text-white font-semibold rounded-md px-4 py-2 shadow-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-300"
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard