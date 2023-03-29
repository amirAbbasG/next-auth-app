import React from 'react'
import styles from "./styles/Layout.module.css"

const Layout = ({ children }) => {
    return (
        <div className='flex h-screen bg-blue-400'>
            <div className="m-auto rounded-md w-3/5 grid lg:grid-cols-2 bg-slate-50">
                <div className={styles.img}>
                    <div className={styles.cartoonImg} />
                    <div className={styles.cloud_one} />
                    <div className={styles.cloud_two} />
                </div>
                <div className='flex text-center py-10'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout