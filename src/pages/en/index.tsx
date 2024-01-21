/** @format */
import fs from 'fs';
import Head from 'next/head';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Content from '@/components/container/Content';

import Main from '@/components/container/Main';
import Text from '@/components/container/Text';

import headerStyles from '@/styles/components/header/Header.module.css'
import styles from '@/styles/CookbookIndex.module.css'

import ScrollNavLink from '@/components/links/ScrollNavLink';
import dynamic from 'next/dynamic';

import Link from 'next/link';
import matter from 'gray-matter';
import Card from '@/components/container/Card';
import IRecipePost from '@/interfaces/IRecipePost';
import IRecipeCategory from '@/interfaces/IRecipeCategory';

const ThemeButton = dynamic(() => import('@/components/buttons/ThemeButton'), {
  ssr: false,
});

export default function MarkdownPostListTemplate(props: { posts: IRecipePost[], postCategories: string[] }) {
  function makeFirstLetterUppercase(name: string) {
    const nameLetters: string[] = []
    nameLetters.push(name[0].toUpperCase())

    for (let i = 1; i < name.length; i++) {
      nameLetters.push(name[i]);
    }
    return nameLetters.join('')
  }

  return (
    <>
      <Head>
        <title>Kyle Klus | Cookbook 🧑‍🍳</title>
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
      <Header>
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="https://kyleklus.github.io/#heroPage"
          displayText="Home"
        />
        <ScrollNavLink
          className={headerStyles.headerNavLink}
          elementName="/en"
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
        <Content id='markdownSection' className={[styles.cookbookIndex, 'applyHeaderOffset'].join(' ')}>
          <Text>
            <h1>Kyle&apos;s Cookbook 🧑‍🍳</h1>
            {props.postCategories.map((category, i) => {
              const categoryPosts = props.posts.filter(post => post.categories.filter(postCategory => postCategory === category).length !== 0)

              return (
                <div key={i}>
                  <h2>{makeFirstLetterUppercase(category)}</h2>
                  {categoryPosts.length !== 0 && categoryPosts.map((post, j) => {

                    return (
                      <Card key={j} className={[styles.entry].join(' ')}>
                        <Link className={[styles.entryLink].join(' ')} href={post.url}>{makeFirstLetterUppercase(post.title)}</Link>
                        <p className={[styles.entryInfo].join(' ')}>{'Author: ' + post.author + ' | ' + post.categories.join(' | ')}</p>
                        <p className={[styles.entryInfo].join(' ')}>{'Author: ' + post.author}</p>
                        <p className={[styles.entryInfo].join(' ')}>{'Categories: ' + post.categories.join(' | ')}</p>
                      </Card>
                    )
                  })}
                </div>
              )
            })}
          </Text>
        </Content>
        <Footer />
      </Main>
    </>
  );
}

export async function getStaticProps() {
  // variables
  const serverFolder = 'recipes_EN/'
  const delimiter = '---'

  // get markdown files
  const filenames = fs.readdirSync(serverFolder).filter(file => file.endsWith('.md'))

  // Convert markdown files into posts
  const posts: IRecipePost[] = filenames.map((filename) => {
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

    return {
      filename: filename,
      filepath: filepath,
      url: url,
      title: frontmatter.title,
      author: frontmatter.author,
      categories: categories,
      created: frontmatter.created,
      content: fileContent,
    }
  })
  const categorizedPosts: IRecipeCategory[] = [];

  posts.forEach(post => {
    const visitedCategoryTrace: IRecipeCategory[] = [];

    post.categories.forEach((category, index) => {
      if (category === 'moc') { return }

      if (visitedCategoryTrace.length === 0) {
        const filteredCategory = categorizedPosts.filter(e => e.title === category)
        const postsInCategory = []
        if (index === post.categories.length - 1) { postsInCategory.push(post) }

        if (filteredCategory.length === 0) {
          categorizedPosts.push({
            title: category,
            url: `/en/${category}`,
            otherCategories: [],
            posts: postsInCategory
          })

          visitedCategoryTrace.push(categorizedPosts[categorizedPosts.length - 1])
        } else {
          if (postsInCategory.length !== 0) { filteredCategory[0].posts.push(postsInCategory[0]) }

          visitedCategoryTrace.push(filteredCategory[0])
        }
      } else {
        const lastVisitedCategory = visitedCategoryTrace[visitedCategoryTrace.length - 1]
        const filteredCategory = lastVisitedCategory.otherCategories.filter(e => e.title === category)
        const postsInCategory = []
        if (index === post.categories.length - 1) { postsInCategory.push(post) }

        if (filteredCategory.length === 0) {

          lastVisitedCategory.otherCategories.push({
            title: category,
            url: `/en/${visitedCategoryTrace.map(e => e.title).join('/')}/${category}`,
            otherCategories: [],
            posts: postsInCategory
          })

          visitedCategoryTrace.push(lastVisitedCategory.otherCategories[lastVisitedCategory.otherCategories.length - 1])
        } else {
          if (postsInCategory.length !== 0) { filteredCategory[0].posts.push(postsInCategory[0]) }

          visitedCategoryTrace.push(filteredCategory[0])
        }
      }
    })
  })

  return {
    props: {
      posts: posts,
      postCategories: categorizedPosts.map(e => e.title),
    }
  }
}
