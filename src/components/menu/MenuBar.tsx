import * as React from 'react';
import { connect } from 'react-redux';
import './menubar.scss';

class MenuBar extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ textAlign: 'center', borderBottom: '1px solid #f2f3f3' }}>
        <div className="menu-container container">
          <div className="menu-item">Bikes</div>
          <div className="menu-item">Scooters</div>
          <div className="menu-item">Bike Finance</div>
          <div className="menu-item">Used Bike</div>
          <div className="menu-item">Sale Bike</div>
          <div className="menu-item">Offers</div>
          <div className="menu-item">News & Reviews</div>
          <div className="menu-item">More</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(MenuBar);
