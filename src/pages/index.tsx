/** @format */
import fs from 'fs';
import path from 'path';


import Head from 'next/head';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Content from '@/components/Content';

import Main from '@/components/Main';

import headerStyles from '@/styles/components/header/Header.module.css'
import styles from '@/styles/CookbookIndex.module.css'

import ScrollNavLink from '@/components/header/ScrollNavLink';
import dynamic from 'next/dynamic';

import Link from 'next/link';
import matter from 'gray-matter';
import IPost from '@/interfaces/IPost';
import Card from '@/components/Card';

const ThemeButton = dynamic(() => import('@/components/buttons/ThemeButton'), {
  ssr: false,
});

export default function MarkdownPostListTemplate(props: { posts: IPost[] }) {
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
        <Content id='markdownSection' className={[styles.cookbookIndex, 'applyHeaderOffset'].join(' ')}>
          {...props.posts.map((post, index) => {
            return (
              <Card key={index} >
                <Link href={post.slug}>{post.frontmatter.title}</Link>
              </Card>
            )
          })}
        </Content>
        <Footer />
      </Main>
    </>
  );
}

export async function getStaticProps() {
  // get files
  const folder = 'recipes/'
  const delimiter = '---'
  const filenames = fs.readdirSync(folder)
  const markdownFilenames = filenames.filter(file => file.endsWith('.md'))

  const posts: IPost[] = markdownFilenames.map((filename) => {
    const slug = filename.replace('.md', '')
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
      name: filename,
      slug: slug,
      path: path,
      frontmatter: frontmatter,
      content: fileContent
    }
  })

  return {
    props: {
      posts: posts,
    }
  }
}