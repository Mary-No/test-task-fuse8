import { useState } from "react";
import { Link } from "react-router-dom";
import {ApiResponse} from "../../api/types";
import {Input} from "../../components/Input/Input";
import { NotFound } from "../../components/NotFound/NotFound";
import {CharacterCard} from "../../components/CharacterCard/CharacterCard";
import s from "./Home.module.css"


export function Home() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const handleSearch = (data: ApiResponse) => {
        setError(null)
        setData(data);
    };
    const handleError = (errorMessage: string) => {
        setData(null);
       setError(errorMessage)
    };
    return (
        <>
            <Input onSearch={handleSearch} setError={handleError}/>
            {data && (
                <div className={s.charactersContainer}>
                    <div className={s.charactersCount}><p>Found characters: {data.info.count}</p></div>
                    <div>
                        <ul className={s.charactersList}>
                            {data?.results.map((character) => (
                                <li key={character.id}>
                                    <Link to={`/character/${character.id}`}><CharacterCard
                                        character={character}/></Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            )}
            {error !== null && <NotFound error={error}/>}

        </>
    );
}