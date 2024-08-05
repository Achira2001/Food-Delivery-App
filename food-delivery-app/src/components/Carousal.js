import React from 'react';

export default function Carousal() {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id="carousel">
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <form className='d-flex'>
                            <input className='form-control me-2' type="search" placeholder='Search' aria-label="Search"/>
                            <button className="btn btn-outline-success text-white bg-success" type="submit"> Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://cdn.pixabay.com/photo/2023/05/29/17/01/hamburger-8026582_1280.jpg" className="d-block w-100" alt="Burger" />
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
    );
}
