import React from "react"

const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    new FormData(e.target).forEach((value, key) => data[key] = value);

    const hatUrl = 'http://localhost:8090/api/hats/';
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
        const newHat = await response.json();
        console.log(newHat);
        e.target.reset();
    }
}



function HatForm(props) {
    return (
        <form onSubmit={handleSubmit}>
            <input name="fabric" placeholder="fabric" />
            <input name="style" placeholder="style" />
            <input name="color" placeholder="color" />
            <input name="location" placeholder="location" />
            <button className="btn btn-primary">Create</button>
        </form>
    )
}

export default HatForm
