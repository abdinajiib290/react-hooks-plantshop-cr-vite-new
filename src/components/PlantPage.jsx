import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch plants on component mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  // Filter plants based on search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a new plant
  const handlePlantAdded = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  // Handle search query changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <main>
      <NewPlantForm onPlantAdded={handlePlantAdded} />
      <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
