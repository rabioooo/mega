import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Body.css';
import user_photo from '../../images/photo.png';


export default function Body() {
    const [users, setUsers] = useState([]);
    const [newUserData, setNewUserData] = useState({ name: '', age: '', city: '' });
    const [placeholders, setPlaceholders] = useState({ name: 'Your Name Here ...', age: 'Your Age Here ...', city: 'Your City Here ...' });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        Axios.get('http://localhost:3001/users')
            .then((res) => {
                const receivedUsers = res.data;
                setUsers(receivedUsers);
                console.log('Received data:', receivedUsers);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const addUser = () => {
        if (newUserData.name === '' || newUserData.age === '' || newUserData.city === '') {
            alert('Please fill in all the fields');
        } else {
            Axios.post('http://localhost:3001/users', newUserData)
                .then((res) => {
                    console.log('User added:', res.data);
                    fetchData();
                    setNewUserData({ name: '', age: '', city: '' });
                    setPlaceholders({ name: 'Name', age: 'Age', city: 'City' });
                    alert('User added successfully!');
                })

                .catch((error) => {
                    console.error('Error adding user:', error);


                });
        }
    };
    const updateUser = () => {
        if (newUserData.name === '' || newUserData.age === '' || newUserData.city === '') {
            alert('Please fill in all the fields');
        } else {
            Axios.put(`http://localhost:3001/users/${editingUserId}`, newUserData)
                .then((res) => {
                    console.log('User updated:', res.data);
                    fetchData();
                    setNewUserData({ name: '', age: '', city: '' });
                    setEditingUserId(null);
                    setShowEditModal(false);
                    setPlaceholders({ name: 'Name', age: 'Age', city: 'City' });
                    alert('User update successfully!');

                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                });
        }
    };
    const deleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            Axios.delete(`http://localhost:3001/users/${userId}`)
                .then((res) => {
                    console.log('User deleted:', res.data);
                    fetchData();
                    alert('User deleted successfully!');

                })
                .catch((error) => {
                    console.error('Error deleting user:', error);
                });
        }
    };
    const handleEdit = (userId) => {
        const userToEdit = users.find((user) => user._id === userId);
        setNewUserData({
            name: userToEdit.name,
            age: userToEdit.age,
            city: userToEdit.city,
        });
        setEditingUserId(userId);
        setShowEditModal(true);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleInputAdd = (e) => {
        const { name, value } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const cancelEdit = () => {
        setShowEditModal(false);
        setNewUserData({ name: '', age: '', city: '' });
        setEditingUserId(null);
    };
    return (
        <div className='container'>
            <div className='inputs'>
                <div className='input'>
                    <button className='btn btn-dark' onClick={addUser}>
                        Add User
                    </button>
                    <input
                        className='inpo'
                        type="text"
                        placeholder={placeholders.name}
                        name="name"
                        value={newUserData.name}
                        onChange={handleInputAdd}
                    />
                    <input
                        className='inpo'
                        type="number"
                        placeholder={placeholders.age}
                        name="age"
                        value={newUserData.age}
                        onChange={handleInputAdd}
                    />
                    <input
                        className='inpo'
                        type="text"
                        placeholder={placeholders.city}
                        name="city"
                        value={newUserData.city}
                        onChange={handleInputAdd}
                    />
                </div>
            </div>
            <div className='A'>
                <div className='B'>
                    {users.map((user) =>
                        <div className='item' key={user._id}>
                            <header ><img className='photo' src={user_photo} alt='user_image' />
                                <div className='info'>
                                    <div><b>Name: </b>{user.name}</div>
                                    <div><b>Age: </b>{user.age}</div>
                                    <div><b>City: </b>{user.city}</div>
                                    <button className='btn btn-danger' onClick={() => deleteUser(user._id)}>
                                        Delete
                                    </button>
                                    <button className='btn btn-success' onClick={() => handleEdit(user._id)}>
                                        Edit
                                    </button>
                                </div>

                            </header>
                        </div>
                    )}
                </div>
            </div>

            <div>
                {showEditModal && (
                    <div className="container_pop popup">
                        <span>Are you sure you want to edit this user?</span>

                        <div className='inputs_pop'>

                            <div className='input_pop'>
                                <input
                                    className='inpo'
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={newUserData.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className='inpo'
                                    type="number"
                                    placeholder="Age"
                                    name="age"
                                    value={newUserData.age}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className='inpo'
                                    type="text"
                                    placeholder="City"
                                    name="city"
                                    value={newUserData.city}
                                    onChange={handleInputChange}
                                /><button className='btn btn-primary' onClick={updateUser}>
                                    {editingUserId ? 'Update' : 'Add User'}
                                </button>
                                <button className='btn btn-danger' onClick={cancelEdit}>Cancel</button>
                            </div>


                        </div>
                    </div>
                )}
                {users.length === 0 ? <div className='data'>No data</div> : users.map((user) => <div key={user._id}></div>)}
            </div>
        </div>
    );
}
