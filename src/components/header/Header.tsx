import * as React from 'react';
import { connect } from 'react-redux';
import './header.scss';
import TextInput from '../common/TextInput/TextInput';
import SideBar from './../sideBar/SideBar';
class Header extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      open: false
    };
  }

  handleSearch = (event) => {
    this.setState({
      ...this.state,
      name: event,
    });
  };

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div style={{ borderBottom: '1px solid #f2f3f3' }}>
        <div className="header-wrapper container">
          <div className="header-container row">
            <div className="col-sm-3 logo">
              <div className="mobile-ham d-block" onClick={this.toggleDrawer}>
                <span className="icon" />
              </div>
              <a
                href="/"
                title="ElectricBikes.com - Best Place to buy Electric Bikes in India"
                className="logo-link"
              >
                <img
                  src="https://bd.gaadicdn.com/pwa/img/bd-logo.svg?v=1.0"
                  alt="BikeDekho.com - Best place to buy New Bikes in India"
                />
              </a>
            </div>
            <div className="col-sm-5 search">
              <TextInput
                value={this.state.name}
                onChange={this.handleSearch}
                customClass=""
                placeholder={
                  'Search Bikes or Scooters eg. YZF R15 V3, Activa 6G'
                }
              />
              {this.state.name.length > 2 ? (
                <div className="list-search col-sm-12">
                  <div className="_item">asdasdasd</div>
                  <div className="_item">asdasdasd</div>
                  <div className="_item">asdasdasd</div>
                  <div className="_item">asdasdasd</div>
                  <div className="_item">asdasdasd</div>
                  <div className="_item">asdasdasd</div>
                  <div className="_item">asdasdasd</div>
                  <div className="_item">asdasdasd</div>
                  <div className="_item">asdasdasd</div>
                </div>
              ) : null}
            </div>
            <div className="col-sm-4 cta">
              <div className="elem">
                <div className="login">
                  <i className="icon_user" />
                </div>
                <div className="text">Login/Register</div>
              </div>
              <div className="elem">
                <div>
                  <img
                    src={require('./../../assets/images/location.svg').default}
                  />
                </div>
                <div className="text">
                  <big> Mumbai </big>
                  <small> Change City </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.open ? <SideBar 
          onClose={this.toggleDrawer}
        /> : null }
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
