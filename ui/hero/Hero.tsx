"use client"
import styles from './Hero.module.css'

import { FaLocationPin } from "react-icons/fa6";

import { MdOutlineAccessTimeFilled } from "react-icons/md";

import HeaderWithLine from '../HeaderWithLine/HeaderWithLine';
import { useRouter } from 'next/navigation';
import Button from '../Buttons/Button';


const Hero = () => {
    
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container">
      {/* header */}
      <p className={styles.header}>
        Join us in celebrating
        <br />
        <span className={styles.celebrant_name}>Amara’s</span>
        <br />
        Baptism and 1 <sup>st</sup> Birthday!
      </p>

      <HeaderWithLine text="September 21, 2025" />

      {/* details */}
      <div className={styles.details_container}>
        <div className={styles.details_table}>
          <div className={styles.row}>
            <div className={styles.table_header}>Baptism</div>
            <div className={styles.cell}>
              St. Augustine Catholic Church
              <br />
              <br />
              <address>
                <FaLocationPin /> 3700 Callan Blvd. South San Francisco, CA
              </address>
              <p style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <MdOutlineAccessTimeFilled /> 12:30PM
              </p>

              <Button
               value='view more'
               icon='arrow_down'
               onClick={() => scrollToSection('baptismDetailsSection')}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.table_header}>Reception</div>
            <div className={styles.cell}>
              Via Mare of America
              <br />
              <br />
              <address style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FaLocationPin /> 6423 Mission St. Daly City, CA
              </address>
              <br />
              <p style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <MdOutlineAccessTimeFilled /> 01:30 PM
              </p>
              
              <Button
               value='view more'
               icon='arrow_down'
               onClick={() => scrollToSection('receptionDetailsSection')}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero