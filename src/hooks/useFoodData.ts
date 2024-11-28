import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from "../interface/FoodData";

// Pega a URL da variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

const fetchData = async (): AxiosPromise<FoodData[]> => {
    const response = await axios.get(`${API_URL}/food`);
    return response;
}

export function useFoodData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    };
}
