import { FC } from 'react'

import styles from  "./HeaderWithLine.module.css"


type HeaderWithLineProps = {
    text: string;
    font?: string;
}

const HeaderWithLine:FC<HeaderWithLineProps> = ({text, font}) => {
  return <span className={styles.header_with_line} style={{ fontFamily: font ? font : 'var(--font-italianno)' }}>{text}</span>
}

export default HeaderWithLine