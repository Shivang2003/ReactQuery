import { NavLink } from "react-router-dom"
export const Header = () => {
    return(
    <header>
    <div>
        <NavLink to="/">My React Query</NavLink>
        <ul>
            <li>
                <NavLink to="/home">Home</NavLink>
            </li>
            <li>
                <NavLink to="/trad">fetchOld</NavLink>
            </li>
            <li>
                <NavLink to="/rq">FetchRQ</NavLink>
            </li>
        </ul>
    </div>
    </header>
    )
}