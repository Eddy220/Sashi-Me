import React from 'react';
import './SplashPage.css';

function SplashPage() {
  return (
    <div>
      <div className='logoContainer'>
       <img className='logo' src='../../Sashi-Me.png'></img>
      </div>
      <div className='splashPageImage'>
        {/* <div>
          <img src='Sashi-Me.png' className='picture'></img>
        </div> */}
        <div className='searchBar'>
          <input className='searchInput' type='txt' placeholder='Search for a restaurant...'></input>
          <button className='searchBtn' type='submit'>Search!</button>
        </div>
      </div>
    </div>
  )
}

export default SplashPage;
