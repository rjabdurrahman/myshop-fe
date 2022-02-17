import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

export default function Customers() {

    const [customers, setCustomer] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
    } = useFormik({
        initialValues: {
            id: '',
            name: '',
            email: '',
            phone: '',
            address: ''
        },
        validate: (values) => {
            const errors = {};
            let {id, name, email, phone, address} = values;
            if(!id) {
                errors.id = 'ID is required!'
            }
            if(!name) {
                errors.name = 'Name is required!'
            }
            if(!email) {
                errors.email = 'Email is required!'
            }
            if(!phone) {
                errors.phone = 'Phone is required!'
            }
            if(!Number(phone)) {
                errors.phone = 'Phone No must contains Digits'
            }
            if(phone.length !== 11) {
                errors.phone = 'Phone No must be in 11 Digit'
            }
            if(!address) {
                errors.address = 'Address is required!'
            }
            return errors;
        },
        onSubmit: (values, { setFieldValue, setFieldError }) => {
            axios.post('http://localhost:5000/customer', values)
                .then(res => {
                    setFieldValue('id', '')
                    setFieldValue('name', '')
                    setFieldValue('email', '')
                    setFieldValue('phone', '')
                    setFieldValue('address', '')
                    setModalOpen(false)
                    alert('Customer Added Successfully')
                })
                .catch(err => {
                    let {id, name, email, phone, address} = err.response.data;
                    if(id) setFieldError('id', id);
                    if(name) setFieldError('name', name);
                    if(email) setFieldError('email', email);
                    if(phone) setFieldError('phone', phone);
                    if(address) setFieldError('address', address);
                })
        }
    });

    useEffect(() => {
        axios.get('http://localhost:5000/customers')
            .then(res => setCustomer(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className='w3-container' style={{ margin: '20px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Customers</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input className="w3-input w3-border" type="text" placeholder='Search...' />
                        <button onClick={() => setModalOpen(true)} style={{ width: '200px' }} className="w3-button w3-teal">Add Customer</button>
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
            <div className="w3-modal" style={isModalOpen ? { display: 'block' } : { display: 'none' }}>
                <form onSubmit={handleSubmit} className="w3-modal-content">
                    <header className="w3-container w3-teal">
                        <span onClick={() => setModalOpen(false)} className="w3-button w3-display-topright">×</span>
                        <h2>Add Customer</h2>
                    </header>
                    <div className="w3-container">
                        <p>
                            <label>ID</label>
                            <input
                                className="w3-input w3-border"
                                id="id"
                                name="id"
                                type="number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.id}
                            />
                        </p>
                        <p style={{ color: 'red' }}>{errors.id && touched.id && errors.id}</p>
                        <p>
                            <label>Name</label>
                            <input
                                className="w3-input w3-border"
                                id="name"
                                name="name"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                            />
                        </p>
                        <p style={{ color: 'red' }}>{errors.name && touched.name && errors.name}</p>
                        <p>
                            <label>Phone</label>
                            <input
                                className="w3-input w3-border"
                                id="phone"
                                name="phone"
                                type="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                            />
                        </p>
                        <p style={{ color: 'red' }}>{errors.phone && touched.phone && errors.phone}</p>
                        <p>
                            <label>Email</label>
                            <input
                                className="w3-input w3-border"
                                id="email"
                                name="email"
                                type="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                            />
                        </p>
                        <p style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</p>
                        <p>
                            <label>Address</label>
                            <input
                                className="w3-input w3-border"
                                id="address"
                                name="address"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                            />
                        </p>
                        <p style={{ color: 'red' }}>{errors.address && touched.address && errors.address}</p>
                    </div>
                    <footer className="w3-container">
                        <p style={{ textAlign: 'right' }}>
                            <button onClick={handleSubmit} type="submit" style={{ marginRight: '10px' }} className="w3-button w3-indigo">Submit</button>
                            <button type="reset" onClick={() => setModalOpen(false)} className="w3-button w3-red">Close</button>
                        </p>
                    </footer>
                </form>
            </div>
        </>

    );
}