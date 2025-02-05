import React, { useState, useEffect } from 'react';
import { searchCharacters } from "../../api/api";
import {ApiResponse} from "../../api/types";
import s from "./Input.module.css"

interface InputProps {
    onSearch: (data: ApiResponse) => void;
    setError: (errorMessage: string) => void;
}

export const Input = ({ onSearch, setError }: InputProps) => {
    const [enteredLetters, setEnteredLetters] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState<string>('');

    useEffect(() => {
        if (enteredLetters.length >= 3 && enteredLetters !== lastQuery) {
            const timer = setTimeout(() => {
                setIsLoading(true);
                searchCharacters(enteredLetters)
                    .then(data => {
                        onSearch(data);
                        setLastQuery(enteredLetters);
                        setIsLoading(false);
                    })
                    .catch(err => {
                        setError(err.message);
                        setIsLoading(false);
                    });
            }, 500);

            return () => clearTimeout(timer);
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