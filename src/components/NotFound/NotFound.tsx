import s from './NotFound.module.css'
type NotFoundType = {
    error:string
}
export function NotFound( {error}:NotFoundType) {
    return (
        <div className={s.error}>{error}</div>
    );
}