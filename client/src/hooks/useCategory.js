import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //get all categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/category/get-categories');
            setCategories(data?.category);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
};