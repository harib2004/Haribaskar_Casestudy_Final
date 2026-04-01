import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Tabs, Tab, Alert, Badge } from 'react-bootstrap';
import { Trash2, Shield, Users, Hotel as HotelIcon } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        fetchUsers();
        fetchHotels();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users/all");
            setUsers(res.data);
        } catch (err) { 
            console.error("Error fetching users", err); 
        }
    };

    const fetchHotels = async () => {
        try {
            const res = await api.get("/hotels/all");
            setHotels(res.data);
        } catch (err) { 
            console.error("Error fetching hotels", err); 
        }
    };

    const handleDeleteUser = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await api.delete(`/users/delete/${id}`);
                setMessage({ text: "User removed successfully", type: "success" });
                fetchUsers();
            } catch (err) {
                setMessage({ text: "Failed to delete user", type: "danger" });
            }
        }
    };

    const getRoleBadge = (role) => {
        const cleanRole = role?.replace('ROLE_', '');
        switch (cleanRole) {
            case 'ADMIN': return <Badge bg="danger-subtle" className="text-danger border border-danger-subtle rounded-pill px-3">Admin</Badge>;
            case 'OWNER': return <Badge bg="primary-subtle" className="text-primary border border-primary-subtle rounded-pill px-3">Owner</Badge>;
            default: return <Badge bg="secondary-subtle" className="text-secondary border border-secondary-subtle rounded-pill px-3">User</Badge>;
        }
    };

    return (
        <Container className="py-5 mt-5">
            <div className="d-flex align-items-center justify-content-between mb-4 text-start">
                <div>
                    <h2 className="fw-bold mb-1">Admin Dashboard</h2>
                </div>
            </div>

            {message.text && (
                <Alert 
                    variant={message.type} 
                    className="border-0 shadow-sm rounded-4 mb-4"
                    dismissible 
                    onClose={() => setMessage({text:"", type:""})}
                >
                    {message.text}
                </Alert>
            )}
            
            <div className="bg-white shadow-sm border rounded-4 overflow-hidden"> 
                <Tabs defaultActiveKey="users" id="admin-tabs" className="custom-tabs bg-light border-bottom px-3 pt-2">
                    
                    {/* USERS TAB */}
                    <Tab eventKey="users" title={<div className="d-flex align-items-center gap-2 py-2"><Users size={16}/> Users</div>}>
                        <div className="p-0">
                            <Table hover responsive className="align-middle mb-0">
                                <thead className="bg-light">
                                    <tr className="text-muted small text-uppercase fw-bold">
                                        <th className="ps-4 border-0 py-3">ID</th>
                                        <th className="border-0 py-3">Name</th>
                                        <th className="border-0 py-3">Email</th>
                                        <th className="border-0 py-3">Role</th>
                                        <th className="text-center border-0 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.userId}>
                                            <td className="ps-4 text-muted fw-medium">{user.userId}</td>
                                            <td className="fw-bold text-dark">{user.name}</td>
                                            <td className="text-secondary">{user.email}</td>
                                            <td>{getRoleBadge(user.role)}</td>
                                            <td className="text-center">
                                               {user.role !== 'ROLE_ADMIN' && < Button 
                                                    variant="outline-danger" 
                                                    className="border-0 rounded-circle p-2"
                                                    onClick={() => handleDeleteUser(user.userId, user.name)}
                                                    
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>

                    {/* HOTELS TAB */}
                    <Tab eventKey="hotels" title={<div className="d-flex align-items-center gap-2 py-2"><HotelIcon size={16}/> Hotels</div>}>
                        <div className="p-0">
                            <Table hover responsive className="align-middle mb-0">
                                <thead className="bg-light">
                                    <tr className="text-muted small text-uppercase fw-bold">
                                        <th className="ps-4 border-0 py-3">Hotel ID</th>
                                        <th className="border-0 py-3">Hotel Name</th>
                                        <th className="border-0 py-3">Location</th>
                                        <th className="border-0 py-3">Owner Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hotels.map(hotel => (
                                        <tr key={hotel.hotelId}>
                                            <td className="ps-4 text-muted fw-medium">{hotel.hotelId}</td>
                                            <td className="fw-bold text-primary">{hotel.name}</td>
                                            <td>
                                                <span className="d-flex align-items-center gap-1">
                                                    {hotel.location}
                                                </span>
                                            </td>
                                            <td>
                                                <Badge bg="light" className="text-dark border rounded-pill fw-normal px-3">
                                                    Owner ID: {hotel.ownerId}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </Container>
    );
};

export default AdminDashboard;