import axios from 'axios';
import { ApiResponse, Character } from './types';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const searchCharacters = async (query: string): Promise<ApiResponse> => {
    try {
        const response = await axios.get<ApiResponse>(`${API_URL}?name=${query}`);
        return response.data;
    } catch (error) {
        throw new Error('Error searching for characters');
    }
};

export const getCharacterById = async (id: number): Promise<Character> => {
    try {
        const response = await axios.get<Character>(`${API_URL}${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching character');
    }
};