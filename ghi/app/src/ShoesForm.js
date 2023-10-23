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
    if (response.ok) {
      const newShoe = await response.json();
      console.log(newShoe)
      e.target.reset();
    }
    debugger
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
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mt-4">
            <div className="card-body">
              <h3 className="card-title">Add a Pair of Shoes</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" name="manufacturer" placeholder="Manufacturer" />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" name="model_name" placeholder="Model Name" />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" name="color" placeholder="Color" />
                </div>
                <div className="mb-3">
                  <select className="form-select" name="wardrobe_bin" id="wardrobe_bin" required>
                    <option value="">Choose a bin</option>
                    {bins.map((bin) => (<option key={bin.id} value={bin.href}> {bin.id} </option>))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoesForm;
