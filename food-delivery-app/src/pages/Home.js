import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Home() {

    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", { // Corrected URL
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                response = await response.json();
                setFoodItem(response[0]);
                setFoodCat(response[1]);
            } else {
                console.error("Failed to fetch data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id="carousel">
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className='d-flex justify-content-center'>
                                <input className='form-control me-2' type="search" placeholder='Search' aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://cdn.pixabay.com/photo/2023/05/29/17/01/hamburger-8026582_1280.jpg" className="d-block w-100 h-100 " alt="Burger" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://cdn.pixabay.com/photo/2016/11/29/05/07/breads-1867459_960_720.jpg" className="d-block w-100" alt="Pastry" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://cdn.pixabay.com/photo/2015/09/09/17/05/grill-931878_1280.jpg" className="d-block w-100" alt="Barbeque" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container'>
                {
                    foodCat.length > 0
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3' key={data._id}> {/* Added key to parent div */}
                                    <div className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItems.length > 0
                                        ? foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                        <Card foodItem={filterItems}
                                                            
                                                            options={filterItems.options[0]}
                                                            
                                                        />
                                                    </div>
                                                )
                                            })
                                        : <div>No Such Data Found</div>}
                                </div>
                            )
                        })
                        : <div>Loading...</div>
                }
            </div>
        </div>
    )
}
