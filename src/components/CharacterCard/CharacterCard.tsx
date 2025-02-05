import { Character } from "../../api/types";
import {formatDate} from "../../utils/formatDate";
import s from "./CharacterCard.module.css"

type CharacterCardProps = {
    character: Character;
}
export function CharacterCard({ character }: CharacterCardProps) {
    return(
        <div className={s.characterCardContainer}>
        <p>{character.name} - {character.species}</p>
            <div className={s.statusAndCreated}>
                <p>Status: <span className={character.status === "Alive" ? s.greenSpan : s.redSpan}>{character.status}</span></p>
                <p>Created: {formatDate(character.created)}</p>
            </div>
        </div>)
}