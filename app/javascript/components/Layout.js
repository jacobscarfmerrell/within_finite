import React from 'react';
import { Link } from 'react-router';

const Layout = (props) => {
  return(
    <div>
      <header className="mdc-toolbar">
        <div className="mdc-toolbar__row">
          <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
            <span className="mdc-toolbar__title">within:Finite</span>
          </section>
        </div>
      </header>
      <div id="children">
        {props.children}
      </div>
    </div>
  )
}

export default Layout;
