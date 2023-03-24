/** @format */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownSection from '@/components/MarkdownSection';
import Markdown from 'markdown-to-jsx';


import Head from 'next/head';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Content from '@/components/Content';

import Main from '@/components/Main';

import headerStyles from '@/styles/components/header/Header.module.css'
import sideNavStyles from '@/styles/components/header/SideNavigation.module.css'

import ScrollNavLink from '@/components/header/ScrollNavLink';
import dynamic from 'next/dynamic';

import Card from '@/components/Card';
import NavLink from '@/components/header/NavLink';

import Link from 'next/link';
import IPost from '@/interfaces/IPost';
import { GetStaticPropsContext } from 'next/types';

const ThemeButton = dynamic(() => import('@/components/buttons/ThemeButton'), {
  ssr: false,
});

export default function MarkdownPostListTemplate(props: IPost) {
  return (
    <>
      <Head>
        <title>Kyle Klus | {props.frontmatter.title}</title>
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
        <Content className={['applyHeaderOffset'].join(' ')}>
          <Markdown options={{ wrapper: MarkdownSection, forceWrapper: true }}>{props.content}</Markdown>
        </Content>
        <Footer />
      </Main>
    </>
  );
}

export async function getStaticPaths() {
  const folder = 'posts/'
  const filenames = fs.readdirSync(folder)
  const markdownFilenames = filenames.filter(file => file.endsWith('.md')).map(filename => '/' + folder + filename).map(filename => filename.replace('.md', ''))
  return {
    paths: markdownFilenames,
    fallback: false
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {

  // get files
  const folder = 'posts/'
  const delimiter = '---'
  if (!params || !params.markdownPostTemplate || Array.isArray(params.markdownPostTemplate)) return { props: {} };

  const filename = params.markdownPostTemplate + '.md'

  const slug = params.markdownPostTemplate
  const path = `${folder}${filename}`
  const buffer = fs.readFileSync(path, 'utf-8')
  let fileContent = buffer.toString();
  let frontmatter = {}

  if (fileContent.startsWith(delimiter)) {
    frontmatter = matter(fileContent).data
    const startOfFrontmatter = fileContent.indexOf(delimiter)
    const endOfFrontmatter = fileContent.indexOf(delimiter, startOfFrontmatter + delimiter.length) + delimiter.length
    fileContent = fileContent.substring(endOfFrontmatter, fileContent.length)
  }

  return {
    props: {
      name: filename,
      slug: slug,
      path: path,
      frontmatter: frontmatter,
      content: fileContent
    }
  }
}
