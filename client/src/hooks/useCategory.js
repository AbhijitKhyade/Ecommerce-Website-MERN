import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //get all categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/category/get-categories`);
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