
import { FC } from 'react';
import styles from './VerticalBreadCrumbs.module.css'

type VerticalBreadCrumbs = {
    title: string;
    content: any
}

const VerticalBreadCrumbs:FC<VerticalBreadCrumbs> = ({ title, content }) => {
  return (
    <div style={{ textAlign: 'left', width: '80vw' }}>
        <div className={styles.media}>
            <div className={styles.media_content}>

                <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                    <div className={styles.media_icon}></div>
                    <strong className={styles.strong}>{title}</strong>
                </div>
                
                <div className={styles.media_description}>{content}</div>
            </div>
        </div>
    </div>
   )
}

export default VerticalBreadCrumbs