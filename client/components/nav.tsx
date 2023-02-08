
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'

const Name = ({ name }: { name: string }) => <span>{name}</span>


const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/users">
                                Users
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/about">
                                About
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Nav
