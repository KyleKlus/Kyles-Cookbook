/** @format */

import styles from '@/styles/components/links/NavLink.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface INavLinkProps {
  className?: string;
  pathName: string;
  displayText: string;
}

/**
 * A link, which shows if it leads to the current page
 * @param props
 * @returns
 */

export default function NavLink(props: React.PropsWithChildren<INavLinkProps>) {
  const router = useRouter();
  const lastBasePathElement: string = router.basePath;
  const lastPathNameElement: string = router.pathname;
  const lastPropsPathNameElement: string = props.pathName;

  console.log(router, lastBasePathElement, lastPathNameElement, lastPropsPathNameElement);
  
  const styleClass = lastPropsPathNameElement.indexOf(lastBasePathElement) !== -1 || lastPropsPathNameElement.indexOf(lastPathNameElement) !== -1 ? styles.isCurrentWindow : '';

  return (
    <Link
      className={styles.navLink + ' ' + styleClass + ' ' + props.className}
      href={props.pathName}
    >
      {props.displayText}
    </Link>
  );
}
