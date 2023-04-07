/** @format */
import fs from 'fs';
import path from 'path';


import Head from 'next/head';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Content from '@/components/Content';

import Main from '@/components/Main';
import Text from '@/components/Text';

import headerStyles from '@/styles/components/header/Header.module.css'
import styles from '@/styles/CookbookIndex.module.css'
import footerStyles from '@/styles/components/footer/Footer.module.css'
import sideNavStyles from '@/styles/components/header/SideNavigation.module.css'

import ScrollNavLink from '@/components/header/ScrollNavLink';
import dynamic from 'next/dynamic';

import Link from 'next/link';
import matter from 'gray-matter';
import IPost from '@/interfaces/IPost';
import Card from '@/components/Card';
import NavLink from '@/components/header/NavLink';
import IRecipePost from '@/interfaces/IRecipePost';
import IRecipeCategory from '@/interfaces/IRecipeCategory';

const ThemeButton = dynamic(() => import('@/components/buttons/ThemeButton'), {
  ssr: false,
});


export default function Home(props: { posts: IRecipePost[], postCategories: string[] }) {
  function getSideNavChildren() {
    return (
      <Card className={sideNavStyles.menuCard}>
        <h4>Other Sites</h4>
        <NavLink
          className={sideNavStyles.sideNavLink}
          pathName="https://majorenkidu.github.io/projects"
          displayText="Projects"
        />
        <NavLink
          className={sideNavStyles.sideNavLink}
          pathName="/en"
          displayText="Cookbook 🇬🇧"
        />
        <NavLink
          className={sideNavStyles.sideNavLink}
          pathName="/de"
          displayText="Cookbook 🇩🇪"
        />
      </Card>
    );
  }
  return (
    <>
      <Head>
        <title>Kyle Klus | Cookbook</title>
        <meta
          name="description"
          content="Cookbook of Kyle Klus."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="manifest" href={process.env.basePath + "/manifest.webmanifest"}></link>
        <link rel="manifest" href={process.env.basePath + "/manifest.json"}></link>
        <link
          rel="shortcut icon"
          href={process.env.basePath + "/favicon.ico"}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={process.env.basePath + "/apple-touch-icon.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={process.env.basePath + "/favicon-32x32.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={process.env.basePath + "/favicon-16x16.png"}
        />
      </Head>
      <Header sideNavChildren={getSideNavChildren()}>
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="https://majorenkidu.github.io/#heroPage"
          displayText="Home"
        />
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="/"
          displayText="Cookbook"
        />
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="https://majorenkidu.github.io/#aboutPage"
          displayText="About"
        />
        <ThemeButton />
      </Header>
      <Main>
        <div id={'top'} />
        <Content id='markdownSection' className={[styles.cookbookIndex, 'applyHeaderOffset'].join(' ')}>
          <Text>
            <h1>Kyle&apos;s Cookbook</h1>
            <Card>
              <ul>
                <li><Link className={[styles.entryLink].join(' ')} href={'/en'}>{'English Version'}</Link></li>
                <li><Link className={[styles.entryLink].join(' ')} href={'/de'}>{'German Version'}</Link></li>
              </ul>

            </Card>
          </Text>
        </Content>
        <Footer>
          <ScrollNavLink
            className={footerStyles.footerNavLink}
            elementName="https://majorenkidu.github.io/#heroPage"
            displayText="Home"
          />
          <ScrollNavLink
            className={footerStyles.footerNavLink}
            elementName="https://majorenkidu.github.io/#portfolioPage"
            displayText="Portfolio"
          />
          <ScrollNavLink
            className={footerStyles.footerNavLink}
            elementName="https://majorenkidu.github.io/#aboutPage"
            displayText="About"
          />
          <Link href={'https://github.com/MajorEnkidu'} className={footerStyles.footerNavLink}>GitHub</Link>
          <Link href={'https://ko-fi.com/majorenkidu'} className={footerStyles.footerNavLink}>Ko-fi</Link>
          <Link href={'mailto:kyle.klus.2@gmail.com'} className={footerStyles.footerNavLink}>Contact</Link>
          <NavLink
            className={footerStyles.sideNavLink + ' ' + footerStyles.footerNavLink}
            pathName="https://majorenkidu.github.io/privacy"
            displayText="Privacy"
          />
        </Footer>
      </Main>
    </>
  );
}
