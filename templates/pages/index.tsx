/** @format */
import Head from 'next/head';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Content from '@/components/Content';
import Text from '@/components/Text';
import Image from 'next/image';

import Main from '@/components/Main';

import textStyles from '@/styles/components/Text.module.css'
import homeStyles from '@/styles/Home.module.css'
import headerStyles from '@/styles/components/header/Header.module.css'
import sideNavStyles from '@/styles/components/header/SideNavigation.module.css'


import ScrollNavLink from '@/components/header/ScrollNavLink';
import dynamic from 'next/dynamic';

import heroPic from '../../public/2023-02-13T20-29-47-521568.jpg'
import aboutPic from '../../public/2023-02-13T20-30-00-388829.jpg'
import redSolitudePic from '../../public/redsolitude.png'
import solitudePic from '../../public/solitude.png'


import Card from '@/components/Card';
import Link from 'next/link';
import NavLink from '@/components/header/NavLink';

const ThemeButton = dynamic(() => import('@/components/buttons/ThemeButton'), {
  ssr: false,
});

export default function Home() {

  return (
    <>
      <Head>
        <title>Kyle Klus | Website</title>
        <meta
          name="description"
          content="Website of Kyle Klus."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="manifest" href="/manifest.webmanifest"></link>
        <link rel="manifest" href="/manifest.json"></link>
        <link
          rel="shortcut icon"
          href="/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <Header>
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="heroPage"
          displayText="Home"
        />
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="portfolioPage"
          displayText="Portfolio"
        />
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="aboutPage"
          displayText="About"
        />
        <ThemeButton />
      </Header>
      <Main>
        <div id={'top'}></div>
        <Content id="heroPage" className={homeStyles.heroPage}>
          <div className={homeStyles.blurredImageWrapper}>
            <Image
              className={homeStyles.heroPageBG}
              alt="travel"
              src={heroPic}
              priority={true}
              loading={'eager'}
              quality={50}
            />
          </div>

          <div className={homeStyles.slideInWrapper}>
            <p className={[homeStyles.xxLarge, textStyles.left, homeStyles.slideInRight].join(' ')}>Hi there👋, I am Kyle!</p>
            <br />
            <br />
            <p className={[homeStyles.xLarge, textStyles.right, homeStyles.slideInLeft].join(' ')}>I am a computer science student,</p>
            <p className={[homeStyles.large, textStyles.left, homeStyles.slideInRight].join(' ')}>a passionate cook 🍳,</p>
            <br />
            <br />
            <p className={[homeStyles.xxLarge, textStyles.left, homeStyles.slideInRight].join(' ')}>a frontend developer🚀,</p>
            <br />
            <p className={[homeStyles.xLarge, textStyles.center, homeStyles.slideInLeftToCenter].join(' ')}>a woodworking hobbyist</p>
            <br />
            <p className={[homeStyles.large, textStyles.right, homeStyles.slideInLeft].join(' ')}>and overall a DIY lover ❤️.</p>
          </div>
        </Content>
        <Content id="portfolioPage" className={[homeStyles.portfolioPage, 'applyHeaderOffset'].join(' ')}>
          <div className={homeStyles.portfolioPageBG}></div>
          <Text>
            <br />
            <br />
            <h1 className={textStyles.center}>Portfolio</h1>
            {/* <Markdown className>{props.posts}
            </Markdown> */}

          </Text>
          <div className={[homeStyles.portfolioCardWrapper].join(' ')}>
            <Card className={[homeStyles.portfolioCard].join(' ')}>
              <h2>Obsidian &quot;Solitude Theme&quot;</h2>
              <br />
              <div className={[homeStyles.portfolioCardImgWrapper].join(' ')}>
                <Image
                  className={[homeStyles.portfolioCardImg].join(' ')}
                  src={solitudePic} alt={'Solitude Promo Screenshot'}
                  priority={true}
                  loading={'eager'}
                  quality={100}></Image>
                <Text className={[homeStyles.portfolioCardText].join(' ')}>
                  <Link href={'https://github.com/MajorEnkidu/solitude-obsidian-theme'}>Solitude</Link> is a modern looking Obsidian theme, which is optimized for desktop, mobile and tablet. It is highly customizable via the <Link href={'https://github.com/mgmeyers/obsidian-style-settings'}>Style Settings</Link> Plugin and has many extra features.
                </Text>
              </div>
            </Card>
            <Card className={[homeStyles.portfolioCard].join(' ')}>
              <h2>Visual Studio Code &quot;Red Solitude&quot; Theme</h2>
              <br />
              <div className={[homeStyles.portfolioCardImgWrapper].join(' ')}>
                <Image
                  className={[homeStyles.portfolioCardImg].join(' ')}
                  src={redSolitudePic} alt={'Red Solitude Promo Screenshot'}
                  priority={true}
                  loading={'eager'}
                  quality={100}></Image>
                <Text className={[homeStyles.portfolioCardText].join(' ')}>
                  <Link href={'https://marketplace.visualstudio.com/items?itemName=MajorEnkidu.red-solitude'}>Red Solitude</Link> is a dark theme with a green-blueish tint. It uses a <mark className='accent-marker'>red</mark> accent color and has a colorful syntax highlighting.
                </Text>
              </div>
            </Card>
          </div>
        </Content>
        <Content id="aboutPage" className={homeStyles.aboutPage}>
          <div className={homeStyles.blurredImageWrapper}>
            <Image
              className={homeStyles.aboutPageBG}
              alt="travel"
              src={aboutPic}
              priority={true}
              loading={'eager'}
              quality={50}
            />
          </div>
          <Text>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Text>
          <div className={homeStyles.aboutPageBGColor}>
            <Text>
              <br />
              <h1 >About Me 🧑🏻‍💻</h1>
              <br />
              <p>Hi there! I&apos;m Kyle Klus, a free time software developer and a student at the University of Hanover, where I&apos;m pursuing a degree in technical computer science.</p>
              <br />
              <p>I love coding in various languages such as React, C/C++, Java and Python. I also enjoy woodworking and DIY projects in my free time. When I&apos;m not coding, you can find me in my workshop, crafting woodworking and in general DIY projects with my own hands.</p>
              <br />
              <p>Currently, I work as a part-time frontend developer for the &quot;Finanz Informatik&quot;, where I create user-friendly WebParts for Microsoft SharePoint sites. And when I need a break from all that, I like to cook delicious meals for myself and my friends. Whether it&apos;s software development, woodworking or cooking, I always strive to do my best and have fun along the way. </p>
              <br />
              <p>Welcome to my website! 🎉</p>
            </Text>
          </div>
        </Content>
        <Footer />
      </Main>
    </>
  );
}
