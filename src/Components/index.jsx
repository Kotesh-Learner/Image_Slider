import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

const index = ({ url, limit }) => {

 
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage("Error Occured While Fetching Data...!:", error);
      setLoading(false);
    }

    if (loading) {
      return <div>Please Wait Data Is Being Fetched...!</div>;
    }
    if (errorMessage !== "null") {
      return <div> Loading Failed...! {errorMessage}</div>;
    }
  }

  function handleBackward() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }
  const handleForward = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);
  return (
    <section>
      <div className="container">
        <BsArrowLeftCircleFill
          onClick={handleBackward}
          className="left-arrow"
        />
        {images && images.length
          ? images.map((imageItem, index) => (
              <img
                key={imageItem.id}
                alt={imageItem.download_url}
                src={imageItem.download_url}
                className={
                  currentSlide === index
                    ? "current-image"
                    : "current-image hide-current-image"
                }
              />
            ))
          : null}
        <BsArrowRightCircleFill
          className="right-arrow"
          onClick={handleForward}
        />
        <span className="circle-indicators">
          {images && images.length
            ? images.map((_, index) => (
                <button
                  key={index}
                  className={
                    currentSlide === index
                      ? "current-indicator"
                      : "current-indicator hide-current-indicator"
                  }
                  onClick={() => setCurrentSlide(index)}
                />
              ))
            : null}
             
        </span>
      </div>

      <div>
        <h1> ImageNumber: { currentSlide+1}</h1>
      </div>
    </section>
  );
};

export default index;
