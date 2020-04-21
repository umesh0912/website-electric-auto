import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import './footer.scss';
const footer = () => {
  return (
    <div className="footer-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="section-title">OverView</div>
            <ul>
              <li>
                <Link to="/">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>FAQs</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-3">
            <div className="section-title">Others</div>
            <ul>
              <li>
                <Link to="/">
                  <span>TrustMarked Bikes</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>Advertise</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>Customer Care</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-3">
            <div className="section-title">Connect With Us</div>
            <ul>
              <li>
                <Link to="/">
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>Dealer Solutions</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>Feedback</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>Support@Electric.com</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-3">
            <div className="section-title">EXPERIENCE YOUR APP</div>
            <ul className="row">
              <li className="col-sm-6">
                <Link to="/">
                  <img src="https://stimg.cardekho.com/pwa/img/playstore.png" />
                </Link>
              </li>
              <li className="col-sm-6">
                <Link to="/">
                  <img src="https://stimg.cardekho.com/pwa/img/appstore.png" />
                </Link>
              </li>
            </ul>
            <div className="social-wrapper">
              <p>Follow Us</p>
              <ul className="social-icons">
                <li>
                  <i className="icon_facebook" />
                </li>
                <li>
                  <i className="icon_instagram" />
                </li>
                <li>
                  <i className="icon_pinterest" />
                </li>
                <li>
                  <i className="icon_whatsapp" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default hot(module)(footer);
