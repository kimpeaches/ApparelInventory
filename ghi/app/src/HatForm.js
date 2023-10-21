import React, { useEffect, useState } from "react";

function HatForm(props) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        new FormData(e.target).forEach((value, key) => (data[key] = value));

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
        <div className="container mt-5">
          <div className="card bg-transparent">
            <div className="card-body">
              <h2 className="card-title">Create a New Hat</h2>
              <form className="hat-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fabric">Fabric:</label>
                  <input type="text" className="form-control" name="fabric" id="fabric" placeholder="Fabric" />
                </div>
                <div className="form-group">
                  <label htmlFor="style">Style:</label>
                  <input type="text" className="form-control" name="style" id="style" placeholder="Style" />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color:</label>
                  <input type="text" className="form-control" name="color" id="color" placeholder="Color" />
                </div>
                <div className="form-group">
                  <label htmlFor="url">Picture:</label>
                  <input type="url" className="form-control" name="url" id="url" placeholder="url" />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location:</label>
                  <select className="form-control" name="location" id="location" required>
                    <option value="">Choose a location</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.href}>{location.closet_name}</option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary" type="submit">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
    }



export default HatForm;
