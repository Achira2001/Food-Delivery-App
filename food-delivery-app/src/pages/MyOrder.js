import React, { useEffect, useState } from 'react';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            try {
                const res = await fetch("http://localhost:5000/api/myOrderData", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: userEmail })
                });

                const response = await res.json();
                console.log("Fetched Order Data: ", response.orderData);
                setOrderData(response.orderData || []);
            } catch (error) {
                console.error("Failed to fetch order data:", error);
                setOrderData([]);
            }
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    const formatOrderDate = (dateString) => {
        if (!dateString) return "Invalid Date";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "Invalid Date" : `${date.toDateString()} at ${date.toLocaleTimeString()}`;
    };

    const calculateTotalPrice = (items) => {
        if (!Array.isArray(items)) return 0;
        return items.reduce((total, item) => total + (item.price * item.qty), 0);
    };

    return (
        <div className='container'>
            <div className='row'>
                {
                    orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((order, index) => (
                            <div key={index} className='order-section'>
                                <hr />
                                <h4 className="order-date">
                                    Order Date: {formatOrderDate(order[0].Order_date)}
                                </h4>
                                <hr />
                                <div className='order-items row'>
                                    {
                                        order.slice(1).map((item, i) => (
                                            <div key={i} className='col-12 col-md-6 col-lg-3'>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} />
                                                    <div className="card-body" align="center">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>Quantity: {item.qty}</span>
                                                            <span className='m-1'>Size: {item.size}</span><br/>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                Price: {item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <h5 className="total-price mt-3">
                                    Total Price: {calculateTotalPrice(order.slice(1))}/-
                                </h5>
                            </div>
                        ))
                    ) : (
                        <div>No Orders Found</div>
                    )
                }
            </div>
        </div>
    );
}
