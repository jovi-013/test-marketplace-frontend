import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, CircularProgress, Box, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const SellerDashboard = () => {
    const [inventory, setInventory] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inventoryRes, ordersRes] = await Promise.all([
                    apiClient.get('/seller/inventory'),
                    apiClient.get('/seller/orders')
                ]);
                setInventory(inventoryRes.data);
                setOrders(ordersRes.data);
            } catch (error) {
                console.error("Failed to fetch seller data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleOpenModal = (order) => {
      setEditingOrder(order);
      setNewStatus(order.status);
      setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingOrder(null);
      setNewStatus("");
    };
    
    const handleStatusUpdate = async () => {
        if (!editingOrder) return;
        try {
            await apiClient.put(`/seller/orders/${editingOrder.id}`, { status: newStatus });
            const ordersRes = await apiClient.get('/seller/orders');
            setOrders(ordersRes.data);
            handleCloseModal();
        } catch (error) {
            console.error("Failed to update order status", error);
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Seller Dashboard</Typography>
            
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>My Inventory</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell align="right">${item.price}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Incoming Orders</Typography>
            {orders.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Product Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Total Price</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>#{order.id}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell align="right">{order.items[0].product_item.product.name}</TableCell>
                                    <TableCell align="right">{order.items[0].product_item.price}</TableCell>
                                    <TableCell align="right">{order.items[0].quantity}</TableCell>
                                    <TableCell align="right">${order.total_price.toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                    <Button size="small" onClick={() => handleOpenModal(order)}>Manage</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No incoming orders.</Typography>
            )}
            
            <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="xs">
                <DialogTitle>Manage Order #{editingOrder?.id}</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="status-select-label">Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                value={newStatus}
                                label="Status"
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                <MenuItem value={'PENDING'}>Pending</MenuItem>
                                <MenuItem value={'CONFIRMED'}>Confirmed</MenuItem>
                                <MenuItem value={'COMPLETED'}>Completed</MenuItem>
                                <MenuItem value={'CANCELED'}>Canceled</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleStatusUpdate} variant="contained">Save Status</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default SellerDashboard;