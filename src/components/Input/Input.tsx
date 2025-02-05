import React, {useEffect, useState} from 'react';
import {searchCharacters} from "../../api/api";
import {ApiResponse} from "../../api/types";
import s from "./Input.module.css"

interface InputProps {
    onSearch: (data: ApiResponse) => void;
    setError: (errorMessage: string) => void;
}

export const Input = ({onSearch, setError}: InputProps) => {
    const [enteredLetters, setEnteredLetters] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState<string>('');

    useEffect(() => {
        if (enteredLetters.length >= 3 && enteredLetters !== lastQuery) {
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            const fetchData = async () => {
                await delay(500); // Задержка перед запросом
                setIsLoading(true);
                try {
                    const data = await searchCharacters(enteredLetters);
                    onSearch(data);
                    setLastQuery(enteredLetters);
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError("An unknown error occurred");
                    }
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        } else if (enteredLetters.length < 3) {
            setIsLoading(false);
        }
    }, [enteredLetters, onSearch, lastQuery, setError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredLetters(e.target.value);
    };

    return (
        <div className={s.inputContainer}>
            <input
                autoFocus
                type="text"
                placeholder="Search characters..."
                value={enteredLetters}
                onChange={handleChange}
                className={s.input}
            />
            {isLoading && <p>Loading...</p>}
        </div>
    );
};