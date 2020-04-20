import * as React from 'react';
import './sideBar.scss';

interface Iprops {
  onClose: () => void;
}
class SideBar extends React.Component<Iprops, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar-container d-block d-sm-none">
        <div onClick={this.props.onClose}>
          <i className="icon_close" />
        </div>
        <div className="top-section">
          <a href="/">
            <img
              src="https://bd.gaadicdn.com/pwa/img/bd_logo_48x48.png?v=1.0"
              alt="logo"
            />
          </a>
          <p className="home--side-title">Home</p>
        </div>
        <div className="main-menu">
          <ul>
            <li>Bikes</li>
            <li>Scooters</li>
            <li>Bike Finance</li>
            <li>Used Bike</li>
            <li>Sale Bike</li>
            <li>Offers</li>
            <li>News & Reviews</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
