/** @format */
import Head from 'next/head';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Content from '@/components/Content';

import Main from '@/components/Main';
import Text from '@/components/Text';

import headerStyles from '@/styles/components/header/Header.module.css'
import styles from '@/styles/CookbookIndex.module.css'

import ScrollNavLink from '@/components/links/ScrollNavLink';
import dynamic from 'next/dynamic';

import Card from '@/components/Card';
import NavLink from '@/components/links/NavLink';
import IRecipePost from '@/interfaces/IRecipePost';

const ThemeButton = dynamic(() => import('@/components/buttons/ThemeButton'), {
  ssr: false,
});

export default function Home(props: { posts: IRecipePost[], postCategories: string[] }) {
  return (
    <>
      <Head>
        <title>Kyle Klus | Cookbook 🧑‍🍳</title>
        <meta
          name="description"
          content="Cookbook of Kyle Klus"
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
      <Header>
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="https://kyleklus.github.io/#heroPage"
          displayText="Home"
        />
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="/"
          displayText="Cookbook"
        />
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="https://kyleklus.github.io/#aboutPage"
          displayText="About"
        />
        <ThemeButton />
      </Header>
      <Main>
        <div id={'top'} />
        <Content id='markdownSection' className={[styles.cookbookIndex, styles.cookbookLanguageIndex, 'applyHeaderOffset'].join(' ')}>
          <Text>
            <h1>Kyle&apos;s Cookbook 🧑‍🍳</h1>
            <Card>
              <ul>
                <li><NavLink className={[styles.entryLink].join(' ')} pathName={'/en'} displayText={'English Version'}/></li>
                <li><NavLink className={[styles.entryLink].join(' ')} pathName={'/de'} displayText={'German Version'}/></li>
              </ul>
            </Card>
          </Text>
        </Content>
        <Footer/>
      </Main>
    </>
  );
}
