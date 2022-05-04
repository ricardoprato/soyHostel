import React from 'react'
import styles from './AlertModal.module.css'

export default function AlertModal({message}) {
  
  return (
    <div className={styles.container}>
      <h1>{message}</h1>
    </div>
  )
}
