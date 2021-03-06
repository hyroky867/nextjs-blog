import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import React from 'react';
import { siteTitle } from './Layout';
import Link from 'next/link';

type Props = {
  home?: boolean;
};

const Header: React.FC<Props> = ({ home }: Props) => {
  return (
    <header className={styles.header}>
      {home ? (
        <>
          <img
            src="/images/profile.jpg"
            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
            alt={siteTitle}
          />
          <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <a>
              <img
                src="/images/profile.jpg"
                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                alt={siteTitle}
              />
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>{siteTitle}</a>
            </Link>
          </h2>
        </>
      )}
    </header>
  );
};

export default Header;
