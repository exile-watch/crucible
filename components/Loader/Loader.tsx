import React from 'react';
import styles from './Loader.module.scss';
import cn from "classnames";

type LoaderProps = {
  className?: string;
  size?: number;
  thickness?: number;
}
const Loader = ({className, size = 30, thickness = 3}: LoaderProps) => (
    <div className={cn(className, styles.loader)} style={{width: size, height: size, borderWidth: thickness}} />
  );

export default Loader;