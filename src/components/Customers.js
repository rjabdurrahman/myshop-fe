import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Customers() {

    const [customers, setCustomer] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/customers')
            .then(res => setCustomer(res.data))
            .catch(err => console.log(err))
    })

    return (
        <div className='w3-container' style={{ margin: '20px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Customers</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input className="w3-input w3-border" type="text" placeholder='Search...' />
                    <button style={{ width: '200px' }} className="w3-button w3-teal">Add Customer</button>
                </div>
            </div>
            <table className="w3-table-all">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(c => (
                        <tr key={c._id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.phone}</td>
                            <td>{c.email}</td>
                            <td>{c.address}</td>
                            <td>
                                <button style={{ marginRight: '10px' }} className="w3-button w3-indigo">Edit</button>
                                <button onClick={() => {
                                    axios.delete('http://localhost:5000/customer/' + c.id)
                                        .then(res => alert('Deleted Successfully!'))
                                        .catch(err => console.log(err))
                                }} className="w3-button w3-red">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}