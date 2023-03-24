/** @format */

import Head from 'next/head';
import dynamic from 'next/dynamic';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Content from '@/components/Content';
import Text from '@/components/Text';
import Main from '@/components/Main';
import ScrollNavLink from '@/components/header/ScrollNavLink';
import styles from '@/styles/Privacy.module.css'
import headerStyles from '@/styles/components/header/Header.module.css'

const ThemeButton = dynamic(() => import('@/components/buttons/ThemeButton'), {
  ssr: false,
});

export default function PrivacyPage() {
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
          elementName="/#heroPage"
          displayText="Home"
        />
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="/#portfolioPage"
          displayText="Portfolio"
        />
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="/#aboutPage"
          displayText="About"
        />
        <ThemeButton />
      </Header>
      <Main>
        <div id={'top'}></div>
        <Content className={[styles.privacyPage, 'applyHeaderOffset'].join(' ')}>
          <Text>
            <br />
            <br />
            <h1>Cookies Policy</h1>
            <br />
            <p>Last updated: March 09, 2023</p>
            <br />
            <p>This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used. This Cookies Policy has been created with the help of the <a href="https://www.termsfeed.com/cookies-policy-generator/" target="_blank" rel="noreferrer">TermsFeed Cookies Policy Generator</a>.</p>
            <br />
            <p>Cookies do not typically contain any information that personally identifies a user, but personal information that we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, see our Privacy Policy.</p>
            <p>We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.</p>
            <br />
            <br />
            <br />
            <h1>Interpretation and Definitions</h1>
            <br />
            <br />
            <h2>Interpretation</h2>
            <br />
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <br />
            <br />
            <h2>Definitions</h2>
            <br />
            <p>For the purposes of this Cookies Policy:</p>
            <ul>
              <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Cookies Policy) refers to Kyle Klus | Website.</li>
              <li><strong>Cookies</strong> means small files that are placed on Your computer, mobile device or any other device by a website, containing details of your browsing history on that website among its many uses.</li>
              <li><strong>Website</strong> refers to Kyle Klus | Website, accessible from <a href="https://majorenkidu.github.io/" rel="external nofollow noopener noreferrer" target="_blank">https://majorenkidu.github.io/</a></li>
              <li><strong>You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.</li>
            </ul>
            <br />
            <br />
            <br />
            <h1>The use of the Cookies</h1>
            <br />
            <br />
            <h2>Type of Cookies We Use</h2>
            <br />
            <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.</p>
            <p>We use both session and persistent Cookies for the purposes set out below:</p>
            <ul>
              <li>
                <p><strong>Necessary / Essential Cookies</strong></p>
                <p>Type: Session Cookies</p>
                <p>Administered by: Us</p>
                <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
              </li>
              <li>
                <p><strong>Functionality Cookies</strong></p>
                <p>Type: Persistent Cookies</p>
                <p>Administered by: Us</p>
                <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
              </li>
            </ul>
            <br />
            <br />
            <h2>Your Choices Regarding Cookies</h2>
            <br />
            <p>If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.</p>
            <p>If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website and some features may not function properly.</p>
            <p>If You would like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser.</p>
            <ul>
              <li>
                <p>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" rel="external nofollow noopener noreferrer" target="_blank">https://support.google.com/accounts/answer/32050</a></p>
              </li>
              <li>
                <p>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" rel="external nofollow noopener noreferrer" target="_blank">http://support.microsoft.com/kb/278835</a></p>
              </li>
              <li>
                <p>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" rel="external nofollow noopener noreferrer" target="_blank">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></p>
              </li>
              <li>
                <p>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" rel="external nofollow noopener noreferrer" target="_blank">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></p>
              </li>
            </ul>
            <p>For any other web browser, please visit your web browsers official web pages.</p>
            <br />
            <br />
            <h2>More Information about Cookies</h2>
            <br />
            <p>You can learn more about cookies here: <a href="https://www.termsfeed.com/blog/cookies/" target="_blank" rel="noreferrer">All About Cookies by TermsFeed</a>.</p>
            <br />
            <br />
            <h2>Contact Me</h2>
            <br />
            <p>If you have any questions about this Cookies Policy, You can contact us:</p>
            <ul>
              <li>By email: kyle.klus.2@gmail.com</li>
            </ul>
          </Text>
        </Content>
        <Footer />
      </Main>
    </>
  );
}
