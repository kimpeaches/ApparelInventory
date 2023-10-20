import React from "react";
import { useEffect, useState } from 'react';


function HatList() {
    const [hats, setHats] = useState([])

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/hats/");

        if (response.ok) {
            const data = await response.json();
            setHats(data.hats)
        }
    }


    useEffect(() => {
        getData()
    }, [])

    const onDeleteHat = async (id) => {
        await fetch(`http://localhost:8090/api/hats/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        window.location.reload();
    }


    return (
        <div className="container">
            <h5 className="card-title">Hat Table</h5>
            <div className="row">
                {hats.map(hat => (
                    <div key={hat.id} className="col-md-4 mb-4">
                        <div className="card bg-transparent">
                            <img
                                src={hat.picture_url}
                                className="card-img-top"
                                alt=""
                            />
                            <div className="card-body">
                                <h5 className="card-title">{hat.fabric}</h5>
                                <p className="card-text">Style: {hat.style}</p>
                                <p className="card-text">Color: {hat.color}</p>
                                <p className="card-text">Location: {hat.location.closet_name}</p>
                                <button
                                    onClick={() => onDeleteHat(hat.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default HatList
