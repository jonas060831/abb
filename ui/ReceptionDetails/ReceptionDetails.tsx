"use client"
import VerticalBreadCrumbs from "../BreadCrumbs/VerticalBreadCrumbs"
import HeaderWithLine from "../HeaderWithLine/HeaderWithLine"

const address = encodeURIComponent("6423 Mission St. Daly City, CA");

const openMaps = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  const url = isIOS
    ? `http://maps.apple.com/?q=${address}`
    : `https://maps.google.com/?q=${address}`;

  window.open(url, '_blank', 'noopener,noreferrer');
};


const receptionDetails = [

    {
        title: "Reception",
        content: <div>
            <p>Via Mare of America</p>
            <span>6423 Mission St. Daly City, CA</span>
            <br /><br />
            <span>located inside 88 Hillside Apartments</span>
        </div>
    },
    {
        title: 'Date and Time',
        content: <div>
            September 21<sup>st</sup> 2025 <br /> <br />
            START TIME: <strong>01:30PM</strong> <br /> <br />
            END TIME: <strong>04:00PM</strong> 
        </div>
    },
    {
        title: 'Parking',
        content: <span>Onsite Carport Parking</span>
    },
    {
        title: 'Drive Now?',
        content: <button onClick={openMaps}>Open Maps</button>
    }

]

const ReceptionDetails = () => {
  return (
    <div className="container" id="receptionDetailsSection">
        
        <HeaderWithLine text="Birthday Reception" font="var(--font-italianno"/>

        <br /><br />

        {/* baptism details */}
        {
            receptionDetails.map( (detail, index) => 
                <VerticalBreadCrumbs key={index} title={detail.title} content={detail.content}/>
            )
        }


    </div>
  )
}

export default ReceptionDetails