import React from 'react';

const Crausal = () => {
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-label="Slide 1"
          aria-current="true"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
          className=""
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
          className=""
        ></button>
      </div>

      <div className="carousel-inner">
        <div
          className="carousel-item active"
          style={{ height: '100vh' }}
        >
          <div className="carouselImg">
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src='assets/image/health-banner1.jpeg'
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="container">
            <div className="carousel-caption">
              <h1>Example headline.</h1>
              <p>
                Some representative placeholder content for the first slide of
                the carousel.
              </p>
              <p>
                <a className="btn btn-lg btn-info" href="#">
                  Sign up today
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item" style={{ height: '100vh' }}>
          <div className="carouselImg">
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src="assets/image/health-banner2.jpeg"
              className="d-block w-100"
              alt="..."
            />
          </div>

          <div className="container">
            <div className="carousel-caption">
              <h1>Another example headline.</h1>
              <p>
                Some representative placeholder content for the second slide of
                the carousel.
              </p>
              <p>
                <a className="btn btn-lg btn-info" href="#">
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item" style={{ height: '100vh' }}>
          <div className="carouselImg">
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src="assets/image/health-banner3.jpeg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="container">
            <div className="carousel-caption">
              <h1>One more for good measure.</h1>
              <p>
                Some representative placeholder content for the third slide of
                this carousel.
              </p>
              <p>
                <a className="btn btn-lg btn-info" href="#">
                  Browse gallery
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crausal;
