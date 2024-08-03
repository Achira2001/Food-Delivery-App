import React from 'react'

export default function Home() {
    return (
        <div>
            <div className="card mt-3" style={{"width": "18rem", "maxheight":"360px"}}>
                <img src="..." className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text"> This is some important text. </p>
                        <div className = "container w-100">
                            <select className='m-2 h-100 w-100 big success'>
                                {Array.from(Array(6))}
                            </select>
                        </div>
                        
                    </div>
            </div>
        </div>
    )
}
