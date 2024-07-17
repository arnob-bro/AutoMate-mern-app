import React, { useState, useEffect } from "react";
import axios from "axios";
import '../components/SearchItems/SearchItems.css'
import Navbar from './navbar/navbar.jsx';

const SearchParts = () => {
  const [name, setName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [parts, setParts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    searchParts();
  }, [page]);

  const searchParts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/parts", {
        params: {
          name: name || undefined,
          vehicleType: vehicleType || undefined,
          vehicleBrand: vehicleBrand || undefined,
          vehicleModel: vehicleModel || undefined,
          page,
          limit,
        },
      });
      setParts(response.data.parts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    searchParts();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
      <div className="Items">
            <Navbar />
      
      
<div className="searchItemContents">
            <div className="sidebar">
      <h1>Search Items</h1>
      <form onSubmit={handleSearch}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Vehicle Type: </label>
          <input
            type="text"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          />
        </div>
        <div>
          <label>Brand: </label>
          <input
            type="text"
            value={vehicleBrand}
            onChange={(e) => setVehicleBrand(e.target.value)}
          />
        </div>
        <div>
          <label>Model: </label>
          <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>





      </div>



      <div className="results">
        
      <h2>Results</h2>

      <ul className="cards">
        <li>part name</li>
        <li>vehicle type</li>
        <li>brand</li>
        <li>model</li>
      </ul>


      <ul>
        {parts.map((part) => (
          <li key={part._id}>
            {part.name} - {part.vehicleType} - {part.vehicleBrand} -{" "}
            {part.vehicleModel}
          </li>
        ))}
      </ul>


      <div>
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)}>Previous</button>
        )}
        {page < totalPages && (
          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        )}
      </div>



      </div>
    


</div>



      </div>
  );
};

export default SearchParts;
