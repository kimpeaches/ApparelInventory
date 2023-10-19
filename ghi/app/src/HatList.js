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
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Hat</th>
                    <th>Fabric</th>
                    <th>Style</th>
                    <th>Color</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {hats.map(hat => {
                    return (
                        <tr key={hat.id}>
                            <td><img src={hat.picture_url} style={{ width: 60, height: 60 }}alt="" /></td>
                            <td>{hat.fabric}</td>
                            <td>{hat.style}</td>
                            <td>{hat.color}</td>
                            <td>{hat.location.closet_name}</td>
                            <td><button onClick={() => onDeleteHat(hat.id)}>Delete</button></td>

                        </tr>
                    );
                })}

            </tbody>
        </table>
    )
}

export default HatList
