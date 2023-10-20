import React from 'react';
import { useEffect, useState } from 'react';


function ShoesList() {
  const [shoes, setShoes] = useState([])

  const getData = async() => {
    const response = await fetch('http://localhost:8080/api/shoes/');

    if (response.ok) {
      const data = await response.json();
      setShoes(data.shoes)
    }
  }

  useEffect(() =>{
    getData()
  }, [])


  const deleteShoe = async (id) => {
    fetch(`http://localhost:8080/api/shoes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    window.location.reload();
  }

    console.log(shoes)

return (
    <div className="container">
      <div className="row">
        {shoes.map((shoe) => (
          <div className="col-md-4" key={shoe.id}>
            <div className="card mt-4">
              <img src={shoe.picture_url} className="card-img-top" alt="Shoe" />
              <div className="card-body">
                <h5 className="card-title">{shoe.model_name}</h5>
                <p className="card-text">Color: {shoe.color}</p>
                <p className="card-text">Manufacturer: {shoe.manufacturer}</p>
                <p className="card-text">Bin: {shoe.wardrobe_bin.closet_name}</p>
                <button
                  onClick={() => deleteShoe(shoe.id)}
                  type="delete-button"
                  className="btn btn-outline-danger"
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

export default ShoesList;
