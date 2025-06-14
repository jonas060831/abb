"use client"
import VerticalBreadCrumbs from "../BreadCrumbs/VerticalBreadCrumbs"
import HeaderWithLine from "../HeaderWithLine/HeaderWithLine"

import styles from './BaptismDetails.module.css'


const address = encodeURIComponent("3700 Callan Blvd, South San Francisco, CA");

const openMaps = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  const url = isIOS
    ? `http://maps.apple.com/?q=${address}`
    : `https://maps.google.com/?q=${address}`;

  window.open(url, '_blank', 'noopener,noreferrer');
};

const baptismDetails = [

    {
        title: "Ceremony Date and Time",
        content: <div>
            September 21<sup>st</sup> 2025 <br /> <br />
            START TIME: <strong>12:30PM</strong> <br /> <br />
            END TIME: <strong>01:30PM</strong> 
        </div>
    },
    {
        title: 'Church Details',
        content: <div>
            <p> St. Augustine Catholic Church </p>
            <address>3700 Callan Blvd. South San Francisco, CA</address>
        </div>
    },
    {
        title: 'Parking',
        content: <span>Onsite Parking</span>
    },
    {
        title: 'Drive Now?',
        content: <button onClick={openMaps}>Open Maps</button>
    }

]

const BaptismDetails = () => {
  return (
    <div className="container" id="baptismDetailsSection">
        
        <HeaderWithLine text="Baptism Details" font="var(--font-italianno)"/>

        <br /><br />

        {/* baptism details */}
        {
            baptismDetails.map( (detail, index) => 
                <VerticalBreadCrumbs key={index} title={detail.title} content={detail.content}/>
            )
        }

    </div>
  )
}

export default BaptismDetails