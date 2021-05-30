import React from 'react';

import styles from './Backdrop.module.scss';

const Backdrop = ({ ...props }) => <div className={styles.backdrop} {...props} />;

export default Backdrop;
