import React from 'react';


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
        const newHat = await response.json();
        console.log(newHat);
        e.target.reset();
    }
}

function ShoesForm(props) {
    return (
        <form onSubmit={handleSubmit}>
            <input name="manufacturer" placeholder="manufacturer" />
            <input name="model_name" placeholder="model_name" />
            <input name="color" placeholder="color" />
            <input name="wardrobe_bin" placeholder="wardrobe_bin" />
            <button className="btn btn-primary">Create</button>
        </form>
    )
}

export default ShoesForm;
