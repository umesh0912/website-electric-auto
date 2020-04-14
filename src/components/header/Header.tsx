import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.scss';

class Header extends React.Component<any, any> {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item right" key={'signout'}>
          <Link className="nav-link" to={'signout'}>
            Sign Out
          </Link>
        </li>,
        <li key={'about'}>
          <Link className="nav-link" to={'about'}>
            About
          </Link>
        </li>,
        <li key={'service'}>
          <Link className="nav-link" to={'service'}>
            Service
          </Link>
        </li>,
        <li key={'feature'}>
          <Link className="nav-link" to={'feature'}>
            Feature
          </Link>
        </li>,
        <li key={'foo'}>
          <Link className="nav-link" to={'Foo'}>
            Foo
          </Link>
        </li>,
      ];
    } else {
      return [
        <li className="nav-item" key={'signin'}>
          <Link className="nav-link" to={'/signin'}>
            Sign In
          </Link>
        </li>,
        <li className="nav-item" key={'signup'}>
          <Link className="nav-link" to={'/signup'}>
            Sign Up
          </Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Admin
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">{this.renderLinks()}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(Header);
