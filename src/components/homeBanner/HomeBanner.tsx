import * as React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import './homebanner.scss';
class HomeBanner extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const params = {
      spaceBetween: 2,
      centeredSlides: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };

    return (
      <div className="app-wrapper">
        <div className="swiper-container">
          <Swiper {...params}>
            <div>
              <span />
            </div>
            <div>
              <span />
            </div>
            <div>
              <span />
            </div>
            <div>
              <span />
            </div>
            <div>
              <span />
            </div>
          </Swiper>
        </div>
      </div>
    );
  }
}

export default HomeBanner;
