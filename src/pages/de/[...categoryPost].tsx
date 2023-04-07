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
import footerStyles from '@/styles/components/footer/Footer.module.css'

import ScrollNavLink from '@/components/header/ScrollNavLink';
import dynamic from 'next/dynamic';

import Card from '@/components/Card';
import NavLink from '@/components/header/NavLink';

import Link from 'next/link';
import IPost from '@/interfaces/IPost';
import { GetStaticPropsContext } from 'next/types';
import IRecipeCategory from '@/interfaces/IRecipeCategory';
import IRecipePost from '@/interfaces/IRecipePost';

import styles from '@/styles/CookbookPost.module.css'
import cookbookStyles from '@/styles/CookbookIndex.module.css'


const ThemeButton = dynamic(() => import('@/components/buttons/ThemeButton'), {
    ssr: false,
});

const LanguageSelector = dynamic(() => import('@/components/buttons/LanguageSelector'), {
    ssr: false,
});

export default function MarkdownPostListTemplate(props: { post: IRecipePost }) {
    function getSideNavChildren() {
        return (
            <Card className={sideNavStyles.menuCard}>
                <h4>Other Sites</h4>
                <NavLink
                    className={sideNavStyles.sideNavLink}
                    pathName="https://majorenkidu.github.io/projects"
                    displayText="Projekte"
                />
                <NavLink
                    className={sideNavStyles.sideNavLink}
                    pathName="/en"
                    displayText="Cookbook 🇬🇧"
                />
                <NavLink
                    className={sideNavStyles.sideNavLink}
                    pathName="/de"
                    displayText="Kochbuch 🇩🇪"
                />
            </Card>
        );
    }
    return (
        <>
            <Head>
                <title>Kyle Klus | {props.post.title}</title>
                <meta
                    name="description"
                    content="Kochbucheintrag von Kyle Klus."
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
                    className={[headerStyles.headerNavLink].join(' ')}
                    elementName="https://majorenkidu.github.io/#heroPage"
                    displayText="Home"
                />
                <ScrollNavLink
                    className={[headerStyles.headerNavLink].join(' ')}
                    elementName="/de"
                    displayText="Kochbuch"
                />
                <ScrollNavLink
                    className={[headerStyles.headerNavLink].join(' ')}
                    elementName="https://majorenkidu.github.io/#aboutPage"
                    displayText="Über mich"
                />
                <ThemeButton />
                {/* <LanguageSelector /> */}
            </Header>
            <Main>
                <div id={'top'}></div>
                <Content className={['applyHeaderOffset', styles.cookbookPost].join(' ')}>
                    <Markdown options={{ wrapper: MarkdownSection, forceWrapper: true }}>{props.post.content}</Markdown>
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
                        displayText="Über mich"
                    />
                    <Link href={'https://github.com/MajorEnkidu'} className={footerStyles.footerNavLink}>GitHub</Link>
                    <Link href={'https://ko-fi.com/majorenkidu'} className={footerStyles.footerNavLink}>Ko-fi</Link>
                    <Link href={'mailto:kyle.klus.2@gmail.com'} className={footerStyles.footerNavLink}>Kontakt</Link>
                    <NavLink
                        className={footerStyles.sideNavLink + ' ' + footerStyles.footerNavLink}
                        pathName="https://majorenkidu.github.io/privacy"
                        displayText="Privatsphäre"
                    />
                </Footer>
            </Main>
        </>
    );
}

export async function getStaticPaths() {
    // variables
    const serverFolder = 'recipes_DE/'
    const delimiter = '---'

    // get markdown files
    const filenames = fs.readdirSync(serverFolder).filter(file => file.endsWith('.md'))

    // Convert markdown files into posts
    const postsUrls: string[] = filenames.map((filename) => {
        let url = filename.replace('.md', '')
        url = '/' + url
        const filepath = `${serverFolder}${filename}`
        let fileContent = fs.readFileSync(filepath, 'utf-8').toString();
        const frontmatter = matter(fileContent).data
        const startOfFrontmatter = fileContent.indexOf(delimiter)
        const endOfFrontmatter = fileContent.indexOf(delimiter, startOfFrontmatter + delimiter.length) + delimiter.length
        fileContent = fileContent.substring(endOfFrontmatter, fileContent.length)

        let categoriesString: string = frontmatter.categories
        const categories: string[] = categoriesString.split(' ')
        url = `/de/${categories.join('/')}` + url
        return url
    })


    return {
        paths: postsUrls,
        fallback: false
    }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {

    // variables
    const serverFolder = 'recipes_DE/'
    const delimiter = '---'

    // get markdown files
    if (!params || !params.categoryPost) return { props: {} };

    let paths = params.categoryPost.toString().split(',')

    const filename = paths[paths.length - 1] + '.md'
    let url = '/' + paths.join('/')
    const filepath = `${serverFolder}/${filename}`
    let fileContent = fs.readFileSync(filepath, 'utf-8').toString();
    const frontmatter = matter(fileContent).data
    const startOfFrontmatter = fileContent.indexOf(delimiter)
    const endOfFrontmatter = fileContent.indexOf(delimiter, startOfFrontmatter + delimiter.length) + delimiter.length
    fileContent = fileContent.substring(endOfFrontmatter, fileContent.length)

    let categoriesString: string = frontmatter.categories
    const categories: string[] = categoriesString.split(' ')
    url = `/de/${categories.join('/')}` + url

    // Convert markdown files into posts
    const post: IRecipePost = {
        filename: filename,
        filepath: filepath,
        url: url,
        title: frontmatter.title,
        author: frontmatter.author,
        categories: categories,
        created: frontmatter.created,
        content: fileContent,
    }


    return {
        props: {
            post: post,
        }
    }
}
