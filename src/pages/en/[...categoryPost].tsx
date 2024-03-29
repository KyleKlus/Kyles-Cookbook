/** @format */
import fs from 'fs';
import matter from 'gray-matter';
import MarkdownSection from '@/lib/markdown/MarkdownSection';
import Markdown from 'markdown-to-jsx';


import Head from 'next/head';
import Footer from '@/lib/layouts/footer/Footer';
import Header from '@/lib/layouts/header/Header';
import Content from '@/lib/container/Content';

import Main from '@/lib/container/Main';

import headerStyles from '@/styles/lib/components/layouts/header/Header.module.css'

import ScrollNavLink from '@/lib/interaction/links/ScrollNavLink';
import dynamic from 'next/dynamic';

import { GetStaticPropsContext } from 'next/types';
import IRecipePost from '@/interfaces/IRecipePost';

import styles from '@/styles/pages/CookbookPost.module.css'
import MarkdownImage from '@/lib/markdown/MarkdownImage';

const ThemeButton = dynamic(() => import('@/lib/interaction/forms/buttons/ThemeButton'), {
    ssr: false,
});

export default function MarkdownPostListTemplate(props: { post: IRecipePost }) {
    return (
        <>
            <Head>
                <title>{'Kyle Klus | ' + props.post.title + ' 🧑‍🍳'}</title>
                <meta
                    name="description"
                    content="Recipe out of Kyles cookbook"
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
                    className={[headerStyles.headerNavLink].join(' ')}
                    elementName="https://kyleklus.github.io/#heroPage"
                    displayText="Home"
                />
                <ScrollNavLink
                    className={[headerStyles.headerNavLink].join(' ')}
                    elementName="/"
                    displayText="Cookbook"
                />
                <ScrollNavLink
                    className={[headerStyles.headerNavLink].join(' ')}
                    elementName="https://kyleklus.github.io/#aboutPage"
                    displayText="About"
                />
                <ThemeButton />
            </Header>
            <Main>
                <div id={'top'}></div>
                <Content className={['applyHeaderOffset', styles.cookbookPost].join(' ')}>
                    <Markdown options={{
                        wrapper: MarkdownSection,
                        overrides: {
                            img: {
                                component: MarkdownImage,
                            },
                        },
                        forceWrapper: true
                    }}>{props.post.content}</Markdown>
                </Content>
                <Footer />
            </Main>
        </>
    );
}

export async function getStaticPaths() {
    // variables
    const serverFolder = 'recipes_EN/'
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
        url = `/en/${categories.join('/')}` + url
        return url
    })


    return {
        paths: postsUrls,
        fallback: false
    }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {

    // variables
    const serverFolder = 'recipes_EN/'
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
    url = `/en/${categories.join('/')}` + url

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
