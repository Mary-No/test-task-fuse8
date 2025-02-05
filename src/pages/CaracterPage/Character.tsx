import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCharacterById} from "../../api/api";
import { Character } from "../../api/types";
import {formatDate} from "../../utils/formatDate";
import s from "./Character.module.css"

export function CharacterPage() {
    const { id } = useParams();
    const [character, setCharacter] = useState<Character>();
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if(id){
            getCharacterById(+id).then(data => {
                setCharacter(data);
            })
                .catch(err => {
                    setError(err.message);
                });
        }
    }, [id])
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!character) {
        return <div>Loading...</div>;
    }

    return <div className={s.characterPage}>
        <Link to={`/`} className={s.back}>Back</Link>
        <div className={s.characterInfo}>
            <h2 className={s.name}>{character.name} - {character.species}</h2>
            <div className={s.info}>
                <img className={s.image} src={character.image} alt={`${character.name}`}/>
                <div className={s.statusGender}>
                    <p>Status: <span className={character.status === "Alive" ? s.greenSpan : s.redSpan}>{character.status}</span></p>
                    <p>Gender:<span>{character.gender}</span></p>
                    <p>Created:<span>{formatDate(character.created)}</span></p>
                </div>
            </div>

        </div>
    </div>

}