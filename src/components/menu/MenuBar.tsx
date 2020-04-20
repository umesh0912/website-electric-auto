import * as React from 'react';
import { connect } from 'react-redux';
import './menubar.scss';

class MenuBar extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{ textAlign: 'center', borderBottom: '1px solid #f2f3f3' }}
        className="d-none d-sm-block
      "
      >
        <div className="menu-container container">
          <ul className="menu-parent">
            <li>
              <a className="menu-item" href="/">
                <span>Bikes</span>
              </a>
              <div className="sub-menu-1">
                <ul>
                  <li>All Bikes</li>
                  <li>Popular Bikes</li>
                  <li>Latest Bikes</li>
                  <li>Upcoming Bikes</li>
                  <li>Best Bikes</li>
                  <li>Electric Bikes</li>
                  <li>BS6 Bikes</li>
                  <li>Showroom</li>
                  <li>Service Center</li>
                </ul>
              </div>
            </li>
            <li>
              <a className="menu-item" href="/">
                <span>Scooters</span>
              </a>
              <div className="sub-menu-1">
                <ul>
                  <li>All Scooters</li>
                  <li>Latest Scooters</li>
                  <li>Upcoming Scooters</li>
                  <li>Best Scooters</li>
                  <li>Showroom</li>
                  <li>Service Center</li>
                </ul>
              </div>
            </li>
            <li>
              <a className="menu-item" href="/">
                <span>Bike Finance</span>
              </a>
              <div className="sub-menu-1">
                <ul>
                  <li>Bike Loan</li>
                  <li>EMI Calculator</li>
                  <li>Personal Loan</li>
                </ul>
              </div>
            </li>
            <li>
              <a className="menu-item" href="/">
                <span>Used Bike</span>
              </a>
              <div className="sub-menu-1">
                <ul>
                  <li>Bike In Your City</li>
                  <li>Search Used Bikes</li>
                  <li>Sell Used Bike</li>
                </ul>
              </div>
            </li>
            <li>
              <a className="menu-item" href="/">
                <span>Sale Bike</span>
              </a>
            </li>
            <li>
              <a className="menu-item" href="/">
                <span>Offers</span>
              </a>
            </li>
            <li>
              <a className="menu-item" href="/">
                <span>News & Reviews</span>
              </a>
              <div className="sub-menu-1">
                <ul>
                  <li>Bike News</li>
                  <li>User Reviews</li>
                </ul>
              </div>
            </li>
            <li>
              <a className="menu-item" href="/">
                <span>More</span>
              </a>
              <div className="sub-menu-1">
                <ul>
                  <li>Bike Insurance</li>
                  <li>Bike Tyres</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(MenuBar);
