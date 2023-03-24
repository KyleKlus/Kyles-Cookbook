/** @format */

import styles from '@/styles/components/footer/Footer.module.css';
import Link from 'next/link';
import NavLink from '../header/NavLink';
import ScrollNavLink from '@/components/header/ScrollNavLink';

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <p>
          Copyright © 2023{' '}
          <Link href={'https://github.com/MajorEnkidu'}>Kyle Klus</Link>
        </p>
        <div className={styles.navLinkWrapper}>
          <ScrollNavLink
            className={styles.footerNavLink}
            elementName="/#heroPage"
            displayText="Home"
          />
          <ScrollNavLink
            className={styles.footerNavLink}
            elementName="/#portfolioPage"
            displayText="Portfolio"
          />
          <ScrollNavLink
            className={styles.footerNavLink}
            elementName="/#aboutPage"
            displayText="About"
          />
          <Link href={'https://github.com/MajorEnkidu'} className={styles.footerNavLink}>GitHub</Link>
          <Link href={'https://ko-fi.com/majorenkidu'} className={styles.footerNavLink}>Ko-fi</Link>
          <Link href={'mailto:kyle.klus.2@gmail.com'} className={styles.footerNavLink}>Contact</Link>
          <NavLink
            className={styles.sideNavLink + ' ' + styles.footerNavLink}
            pathName="/privacy"
            displayText="Privacy"
          />
        </div>
      </footer>
    </>
  );
}
