// HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

interface Order {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    quantity: number;
}

const HomePage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await axios.get<Order[]>('https://localhost:5001/api/orders');
                setOrders(result.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`https://localhost:5001/api/orders/${id}`);
            setOrders(orders.filter(order => order.id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div>
            <h1>Order List</h1>
            <Link to="/new-order">Add New Order</Link> {/* Link to navigate to NewOrderPage */}
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            {order.firstName} {order.lastName} - {order.description} ({order.quantity})
                            <button onClick={() => handleDelete(order.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default HomePage;
