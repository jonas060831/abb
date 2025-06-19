import  { FC } from 'react'

import { GoDotFill, GoChevronDown, GoChevronRight,  } from "react-icons/go";
import { FaMap, FaLocationArrow } from "react-icons/fa";

import styles from './Button.module.css'

type ButtonProps = {
    onClick?: () => void;
    type?: 'submit' | 'button'
    className?: 'light' | 'dark' | 'custom'
    value?: string
    icon?: 'arrow_down' | 'arrow_up' | 'arrow_left' | 'arrow_right' | 'location' | 'map' | 'dot'
}




const Button:FC<ButtonProps> = ({ type='button', className='custom', value='submit', icon=null, onClick}) => {

  const renderIcon = () => {

    switch (icon) {
      case 'arrow_down':
        return <GoChevronDown />
      case 'arrow_right':
        return <GoChevronRight />
      case 'map':
        return <FaMap />
      case 'location':
        return <FaLocationArrow />
    
      default:
        return <GoDotFill />
    }
  }

  // light | dark | custom
  let tripleTernary = (className) ? styles.custom : (className) ? styles.light : styles.dark;
  
  return (
  <button
   className={tripleTernary}
   type={type}
   onClick={onClick}

  >
    {renderIcon()} {value}
  </button>
  )
}

export default Button