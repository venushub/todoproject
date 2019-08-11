import React from 'react'
import { Link , NavLink} from 'react-router-dom'

const Home = () => {
  return(
    <div className="home-main-container">
      <div className="home-header">
        <div className="home-header-title">TODOS</div>
        <div className="home-nav">
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/register">Register</Link>
        </div>
      </div>
      <div className="home-info">
          <ul className="my-ul">
            <li className="home-info-li">✔ Add Your Todos</li>
            <li className="home-info-li">✔ Update Your Todos</li>
            <li className="home-info-li">✔ Delete Your Todos</li>
            <li className="home-info-li">✔ Add Comments</li>
            <li className="home-info-li">✔ Update Comments</li>
            <li className="home-info-li">✔ Delete Comments</li>
            <li className="home-info-li">🤗 Live At Peace</li>
          </ul>
      </div>
      <div className="home-footer"><div>Productivity at Scale</div></div>
    </div>
  )
}

export default Home
