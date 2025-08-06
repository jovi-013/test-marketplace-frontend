import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Box, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                                <Typography variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {product.description}
                                </Typography>
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
                                                <Button variant="contained" size="small">Buy</Button>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No sellers for this product yet.
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;