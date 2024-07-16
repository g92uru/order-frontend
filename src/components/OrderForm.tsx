import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!lastName || lastName.length > 20 || description.length > 100 || quantity < 1 || quantity > 20) {
            setError('Invalid input');
            return;
        }

        try {
            await axios.post('https://localhost:5001/api/orders', {
                firstName,
                lastName,
                description,
                quantity
            });
            window.location.href = '/';
        } catch (err) {
            setError('Error submitting order');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <div>
                <label>First Name (optional)</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} maxLength={20} />
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} maxLength={20} required />
            </div>
            <div>
                <label>Order Description</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} maxLength={100} required />
            </div>
            <div>
                <label>Quantity</label>
                <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10))} min={1} max={20} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default OrderForm;
