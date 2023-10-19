import React from 'react';
import { useEffect, useState } from 'react';


function ShoesForm(props) {
const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {};
    new FormData(e.target).forEach((value, key) => data[key] = value);

    const shoeUrl = 'http://localhost:8080/api/shoes/';
    const fetchingConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(shoeUrl, fetchingConfig);
    if(response.ok) {
        const newShoe = await response.json();
        console.log(newShoe)
        e.target.reset();
    }
}


    const [bins, setBins] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setBins(data.bins);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <input name="manufacturer" placeholder="manufacturer" />
            <input name="model_name" placeholder="model_name" />
            <input name="color" placeholder="color" />
            <select name="wardrobe_bin" id="wardrobe_bin" required>
                <option value="">Choose a bin</option>
                {bins.map(bin => {
                    return (
                        <option key={bin.id} value={bin.href}>{bin.id}</option>
                    )
                })}
            </select>
            <button className="btn btn-primary">Create</button>
        </form>
    )
}

export default ShoesForm;
