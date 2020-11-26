import React from "react";
import { connect } from "react-redux";

import "./header.css";

const Header = ({ name, email, add_post_url }) => (
  <header className="header">
    <div className="header__content">
      <div className="header__user-details">
        {name} <br />
        {email}
      </div>
      <a href={add_post_url} className="header__add-btn">
        <div className="plus">+</div>
        <div>שאלון מותאם</div>
      </a>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  add_post_url: state.user.add_post_url,
});

export default connect(mapStateToProps)(Header);
