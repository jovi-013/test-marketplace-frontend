import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { 
    Container, Typography, Box, CircularProgress, Accordion, 
    AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Divider 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BuyerHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await apiClient.get('/orders/my-history');
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch order history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Order History
            </Typography>
            {orders.length === 0 ? (
                <Typography>You haven't placed any orders yet.</Typography>
            ) : (
                <Box sx={{ mt: 2 }}>
                    {orders.map((order) => (
                        <Accordion key={order.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Order #{order.id}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', width: '33%' }}>
                                    Status: {order.status}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', marginLeft: 'auto' }}>
                                    Total: ${order.total_price.toFixed(2)}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">Items:</Typography>
                                <List>
                                    {order.items.map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            <ListItem>
                                                <ListItemText 
                                                    primary={`${item.product_item.product.name}`}
                                                    secondary={`Quantity: ${item.quantity} @ $${item.price_at_purchase.toFixed(2)} each`}
                                                />
                                            </ListItem>
                                            {index < order.items.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default BuyerHistoryPage;