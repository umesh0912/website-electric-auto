import * as React from 'react';
import './sideBar.scss';

interface Iprops {
  onClose: () => void;
}
class SideBar extends React.Component<Iprops, any> {
  constructor(props) {
    super(props);
    this.state = {
      dropdownType: null;
    }
  }

  toggleMenu = (type: string) => {
    let data: string | null  = type;
    if(type === this.state.dropdownType){
      data = null;
    }
    this.setState({
      ...this.state,
      dropdownType: data
    })
  }

  render() {
    return (
      <div className="sidebar-container d-block d-sm-none">
        <div onClick={this.props.onClose}>
          <i className="icon_close" />
        </div>
        <div className="top-section">
          <a href="#">
            <img
              src="https://bd.gaadicdn.com/pwa/img/bd_logo_48x48.png?v=1.0"
              alt="logo"
            />
          </a>
          <p className="home--side-title">Home</p>
        </div>
        <div className="main-menu">
          <ul>
            <li>
              <a className="menu-item" href="#" onClick={() => this.toggleMenu('all')}>
                <span>Bikes</span>
                <i className={[(
                  this.state.dropdownType === 'all' ? 'icon_up' : 'icon_down'
                )].join(' ')}/>
              </a>
                {this.state.dropdownType === 'all' ? <div className="sub-menu-1">
                  <ul>
                    <li className='sub-menu-item' ><a href='#'>All Bikes</a></li>
                    <li className='sub-menu-item' ><a  href='#' >Popular Bikes</a></li>
                    <li className='sub-menu-item' ><a  href='#' >Latest Bikes</a></li>
                    <li className='sub-menu-item' ><a  href='#' >Upcoming Bikes</a></li>
                    <li className='sub-menu-item' ><a  href='#' >Best Bikes</a></li>
                    <li className='sub-menu-item' ><a  href='#' >Electric Bikes</a></li>
                    <li className='sub-menu-item' ><a  href='#' >BS6 Bikes</a></li>
                    <li className='sub-menu-item' ><a  href='#' >Showroom</a></li>
                    <li className='sub-menu-item' ><a  href='#' >Service Center</a></li>
                  </ul>
                </div>: null}
            </li>
            <li>
              <a className="menu-item" href="#" onClick={() => this.toggleMenu('scooters')}>
                <span>Scooters</span>
                <i className={[(
                  this.state.dropdownType === 'scooters' ? 'icon_up' : 'icon_down'
                )].join(' ')}/>
              </a>
              {this.state.dropdownType === 'scooters' ? <div className="sub-menu-1">
                  <ul>
                  <li className='sub-menu-item' ><a href='#'>All Scooters</a></li>
                    <li className='sub-menu-item' ><a href='#'>Latest Scooters</a></li>
                    <li className='sub-menu-item' ><a href='#'>Upcoming Scooters</a></li>
                    <li className='sub-menu-item' ><a href='#'>Best Scooters</a></li>
                    <li className='sub-menu-item' ><a href='#'>Showroom</a></li>
                    <li className='sub-menu-item' ><a href='#'>Service Center</a></li>
                  </ul>
                </div>: null}
            </li>
            <li>
              <a className="menu-item" href="#" onClick={() => this.toggleMenu('finances')}>
                <span>Bike Finances</span>
                <i className={[(
                  this.state.dropdownType === 'finances' ? 'icon_up' : 'icon_down'
                )].join(' ')}/>
              </a>
              {this.state.dropdownType === 'finances' ? <div className="sub-menu-1">
                  <ul>
                  <li className='sub-menu-item' ><a href='#'>Bike Loan</a></li>
                    <li className='sub-menu-item' ><a href='#'>Emi Calculator</a></li>
                    <li className='sub-menu-item' ><a href='#'>Personal Loan</a></li>
                  </ul>
                </div>: null}
            </li>
            <li>
              <a className="menu-item" href="#" onClick={() => this.toggleMenu('used')}>
                <span>Used Bike</span>
                <i className={[(
                  this.state.dropdownType === 'used' ? 'icon_up' : 'icon_down'
                )].join(' ')}/>
              </a>
              {this.state.dropdownType === 'used' ? <div className="sub-menu-1">
                  <ul>
                    <li className='sub-menu-item' ><a href='#'>Bike In Your City</a></li>
                    <li className='sub-menu-item' ><a href='#'>Buy Used Bikes</a></li>
                    <li className='sub-menu-item' ><a href='#'>Sell Used Bikes</a></li>
                  </ul>
                </div>: null}
            </li>
            <li>
              <a className="menu-item" href="#" onClick={() => this.toggleMenu('sale')}>
                <span>Sale Bike</span>
              </a>
            </li>
            <li>
              <a className="menu-item" href="#" onClick={() => this.toggleMenu('offers')}>
                <span>Offers</span>
              </a>
            </li>
            <li>
              <a className="menu-item" href="#" onClick={() => this.toggleMenu('news')}>
                <span>News & Reviews</span>
                <i className={[(
                  this.state.dropdownType === 'news' ? 'icon_up' : 'icon_down'
                )].join(' ')}/>
              </a>
              {this.state.dropdownType === 'news' ? <div className="sub-menu-1">
                  <ul>
                  <li className='sub-menu-item' ><a href='#'>Bike Reviews</a></li>
                    <li className='sub-menu-item' ><a href='#'>User Reviews</a></li>
                  </ul>
                </div>: null}
            </li>
            <li>
              <a className="menu-item" href="#" onClick={() => this.toggleMenu('more')}>
                <span>More</span>
                <i className={[(
                  this.state.dropdownType === 'more' ? 'icon_up' : 'icon_down'
                )].join(' ')}/>
              </a>
              {this.state.dropdownType === 'more' ? <div className="sub-menu-1">
                  <ul>
                  <li className='sub-menu-item' ><a href='#'>Bike Insurance</a></li>
                    <li className='sub-menu-item' ><a href='#'>Bike Tyres</a></li>
                  </ul>
                </div>: null}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
