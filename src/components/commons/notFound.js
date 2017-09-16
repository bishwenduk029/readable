import React from 'react';

const broken = "https://media.tenor.com/images/c6e07bacc7c2ad722cef70955d3e518b/tenor.gif";

export default function NotFound(props) {
    return (
      <div className="FourOhFour">
        <div className="bg" style={{ backgroundImage: 'url(' + broken + ')'}}></div>
        <h1 className="title">404</h1>
      </div>
    )
}