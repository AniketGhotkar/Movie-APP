import react from "react"

const Card = (props) => {
    // console.log(movie);
    const movie = props.movie;
    const onClick = props.onClick;
    // console.log(movie.movie.Title);
    return (
        <div className="movie" onClick={onClick}>
            <div>
                <p>{movie.Year}</p>
            </div>

            <div>
                <img src = {movie.Poster} alter = {movie.Title}/>
            </div>

            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}

export default Card;