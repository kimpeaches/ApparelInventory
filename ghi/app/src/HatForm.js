import React, { useEffect, useState } from "react"


function HatForm(props) {

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


    const [locations, setLocations] = useState([]);
    const fetchData = async () => {
    const url = 'http://localhost:8100/api/locations/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


    return (
        <form onSubmit={handleSubmit}>
            <input name="fabric" placeholder="fabric" />
            <input name="style" placeholder="style" />
            <input name="color" placeholder="color" />
            <select name="location" id="location" required>
                    <option value="">Choose a location</option>
                    {locations.map(location => {
                      return (
                        <option key={location.id} value={location.href}>{location.closet_name}</option>
                      )
                    })}
                  </select>
            <button className="btn btn-primary">Create</button>
        </form>
    )
}

export default HatForm
