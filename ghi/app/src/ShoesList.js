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
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Shoe</th>
          <th>Model</th>
          <th>Color</th>
          <th>Manufacturer</th>
          <th>Bin</th>
        </tr>
      </thead>
      <tbody>
        {shoes.map(shoe => {
          return (
            <tr key={shoe.id}>
              <td><img src={shoe.picture_url} alt="Shoe" style={{ width: '100px', height: '100px' }} /></td>
              <td>{ shoe.model_name }</td>
              <td>{ shoe.color }</td>
              <td>{ shoe.manufacturer }</td>
              <td>{ shoe.wardrobe_bin.closet_name }</td>
              <td><button onClick={() => deleteShoe(shoe.id)} type="delete-button" className="btn btn-outline-danger">Delete</button></td>
            </tr>

          );
        })}
      </tbody>
    </table>
    );
}

export default ShoesList;
