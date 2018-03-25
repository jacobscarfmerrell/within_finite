import React from 'react';
import { Link } from 'react-router';

const Layout = (props) => {
  return(
    <div>
      <nav className="side-bar">
        <section className="side-bar-section">
          <ul className="top">
          </ul>
        </section>
      </nav>

      {props.children}
    </div>
  )
}

export default Layout;
