import React from 'react';
import axios from 'axios';
import url from '../utils/URL'
import { featuredProducts, flattenProducts } from '../utils/helpers'
export const ProductContext = React.createContext();

// useEffect();
// let's perform side effect - data fetching, window event listener
// by default runs after every render
// cb as first parameter
// returns cleanup function to avoid memory leaks, so it cannot be async
// second argument - array of values(dependencies)

// Provider, Consumer, useContext()
export default function ProductProvider({ children }) {
    const [loading, setLoading] = React.useState(false)
    const [products, setProducts] = React.useState([])
    const [featured, setFeatured] = React.useState([])

    React.useEffect(() => {
        setLoading(true)
        axios.get(`${url}/products`).then(response => {
            const features = featuredProducts(flattenProducts(response.data));
            const products = flattenProducts(response.data)
            setProducts(products)
            setFeatured(features)
            setLoading(false)
        });
        return () => {

        };
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, featured }}>
            {children}
        </ProductContext.Provider>
    )
}
