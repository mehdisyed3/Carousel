import React, { useEffect, useState } from "react";


// import { sportsData } from "/src/sportsphotos.js";
/**
 * Image Carousel Coding Challenge
 *
 * Build a performant image carousel component with the following features:
 *
 * Requirements:
 * 1. Fetch images from this endpoint:
 *    https://www.reddit.com/r/sportsphotography/top/.json?limit=10
 *    - Images are located at: data.children[i].data.url_overridden_by_dest
 *
 * 2. Display one image at a time:
 *    - Center horizontally
 *    - Max height: 200px
 *    - Max width: 200px
 *
 * 3. Automatically cycle through images every 3 seconds
 * 4. Include "Next" and "Previous" buttons for manual navigation
 * 5. Reset the timer when the user navigates manually
 * 6. Display indicator dots showing the current image
 *
 * Performance:
 * - Prevent unnecessary re-renders
 * - Optimize for performance
 *
 * UX:
 * - Show loading states
 * - Handle API errors gracefully
 * - Style the component for visual appeal
 */

const App = () => {
  const [imageData, setImageData] = useState([

    "https://plus.unsplash.com/premium_photo-1664537975122-9c598d85816e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8",
  ]);

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if(currentIndex === imageData.length - 1 ){
        setCurrentIndex(0)
      }
      setCurrentIndex((prev) => (prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [imageData.length]);
  

  const slideImage = (direction) => {
    if(direction === 'previous'){
      if(currentIndex === imageData.length - 1 ){
        setCurrentIndex(0)
      }
      
      setCurrentIndex((prev) => (prev - 1 + imageData.length));
    }
    else if(direction === 'next') {
      setCurrentIndex((prev)=> prev + 1)
    }
    
  }



  return (
    <div className="app">
      <h1>Image Carousel</h1>
      <p>
        Build a performant image carousel component that fetches and displays
        top images from Reddit's sports photography subreddit.
      </p>
      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "#e0e0e0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <button 
        disabled={currentIndex === 0} 
        onClick={()=>slideImage('previous')} >
        {'<'}
        </button>

        <img src={imageData[currentIndex]}
          style={{
            maxHeight: '200px',
            maxWidth: '200px',
            objectFit: "contain",
            display: 'block',

          }}
        />

        <button disabled={currentIndex === imageData.length - 1} onClick={()=>slideImage('next')} >
          {'>'}
        </button>
      </div>
    </div>
  );
};


export default App;