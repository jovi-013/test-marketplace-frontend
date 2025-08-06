import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { 
    Container, Grid, Card, CardContent, Typography, CircularProgress, 
    Box, List, ListItem, ListItemText, Divider, Button, Snackbar, Alert 
} from '@mui/material';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('/products/');
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleBuyClick = async (sellerProduct) => {
        const orderData = {
            seller_id: sellerProduct.seller_id,
            items: [
                {
                    seller_product_id: sellerProduct.id,
                    quantity: 1, // Hardcoded quantity to 1 for simplicity
                },
            ],
        };

        try {
            await apiClient.post('/orders/', orderData);
            setSnackbar({ open: true, message: 'Order placed successfully!', severity: 'success' });
            // TODO: re-fetch product quantity
            
        } catch (error) {
            console.error("Failed to place order:", error);
            const errorMessage = error.response?.data?.detail || 'Failed to place order. The item may be out of stock.';
            setSnackbar({ open: true, message: errorMessage, severity: 'error' });
        }
    };
    
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Products for Sale
            </Typography>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">{product.name}</Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">{product.description}</Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6">Sellers:</Typography>
                                {product.sellers.length > 0 ? (
                                    <List>
                                        {product.sellers.map((sellerProduct) => (
                                            <ListItem key={sellerProduct.id} disableGutters>
                                                <ListItemText 
                                                    primary={`Price: $${sellerProduct.price}`} 
                                                    secondary={`Quantity: ${sellerProduct.quantity}`} 
                                                />
                                                <Button 
                                                    variant="contained" 
                                                    size="small" 
                                                    onClick={() => handleBuyClick(sellerProduct)}
                                                    disabled={sellerProduct.quantity === 0}
                                                >
                                                    Buy
                                                </Button>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">No sellers for this product yet.</Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default HomePage;