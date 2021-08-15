# Build your own blog with Gatsby and GitHub Pages for free

<br>

**TLDR:** *Nowadays, it's becoming harder and harder to stand out from the crowd. If you want to launch your own online presence and show off your tech skills as someone who is starting out in the tech space, then building your own custom blog with `Gatsby.js` could be a great way to do both. You could also deploy your blog (for free!) to GitHub Pages.*

*If you follow this article to the end, you'll have a professional blog site deployed to the web with a homepage that shows a list of article previews and a page for each article. New pages will automatically be generated when you add new content!*

**Prerequisites:** *You'll need some experience with npm and React, and a very basic understanding of the concepts behind GraphQL. You'll also need to be familiar with git and GitHub.*

**Git commits:** *[initial commit](https://github.com/JamesDHW/blog/commit/6f0d6086de8f93626f3060943ba2c4b802913de5) > [configure Gatsby plugins](https://github.com/JamesDHW/blog/commit/9328fb70334b557bb4b64988aa3a226e1f590eba) > [add an article](https://github.com/JamesDHW/blog/commit/b0e02e83779931db52cec7f098f9bb3ce034d46f) > [create components](https://github.com/JamesDHW/blog/commit/af6933b8537615e3397de23fdd463e02932c6f7f)  > [homepage query](https://github.com/JamesDHW/blog/commit/368a335c05a58d3e85c06e0e8839d72924e3bbeb) > [generate pages dynamically](https://github.com/JamesDHW/blog/commit/47a9c95b84cd9a42a6af7f8733050449a4b7b910) > [blog post template](https://github.com/JamesDHW/blog/commit/ab1657d54ef496dc646a80e5d024058eb797f24a) > [add the deployment script](https://github.com/JamesDHW/blog/commit/92adc364fe4d15a1ea04a72eb4faba6b37e5726c).*

**[Example Blog](https://jamesdhw.github.io/blog/)**



## Introduction

Gatsby can serve static React pages, but can also *generate* static pages from React templates that you create. To add a new page to our site we will just need to write a new markdown (`.md`) file. Gatsby will then fill in the template from our content and generate the page for us - this is what makes the framework so powerful and widely-used for creating a blog. 

We will add metadata to our `.md` files by adding a "frontmatter", where we can define any information (in `yaml` syntax) we want, such as the title, date, slug, and author. A frontmatter is prepended to the article `.md` file like so:
<br>

```yaml
---
title: "A blog article"
some_other_property: some-value
---

...

```
<br>

Gatsby uses GraphQL syntax to query the markdown files in our filesystem and pass through the blog content and any metadata to our template as a prop.

Here's what we're going to do in this article:

1. Generate a new Gatsby project in a new git repo connected to a GitHub repo.
2. Configure Gatsby with the plugins we're going to need for parsing the markdown into HTML.
3. Add our first article markdown file.
4. Understand how Gatsby uses GraphQL and write our first query for page content and metadata.
5. Dynamically generate the blog pages from our markdown files.
6. Create a template to display the blog post pages.
7. Deploy our project to GitHub Pages.

### Step 1 - Generate a new Gatsby project

To generate a new Gatsby project, run:

<br>

```bash
npm init gatsby
```
<br>

Name your project "`blog`" and put it in a folder of the same name. Don't add any CMS (`No (or I'll add it later)`). I also chose to install `styled-components` to use in my project as a styling library. When given the option `Would you like to install additional features with other plugins?` navigate straight to `(Done)`. 

Once your project is generated, open it up in you IDE of choice - you can run `npm run develop` inside the project directory to serve a hot-reloading development server on [`http://localhost:8000`](http://localhost:8000).

Let's initialise a git repo for the project. You'll also need to create a remote repo on GitHub where we're going to deploy our blog.

<br>

```bash
# (cd blog)
git init
git remote add origin <your-remote-repo-url-goes-here>
```
<br>

Let's configure all the plugins we're going to need and then we'll write some basic components for our site.


## Step 2 - Configure Gatsby plugins

We're going to install some plugins to use in our project which will add some extra functionality to our Gatsby site:

<br>

```bash
# These libraries parse our markdown into HTML (including images and code blocks).
npm i gatsby-transformer-remark gatsby-remark-images gatsby-remark-prismjs prismjs gatsby-remark-highlight-code

# This library allows you to query the data from your markdown files (e.g., the titles of articles).
npm i gatsby-source-filesystem

# These libraries allow us to render image components.
npm i gatsby-plugin-image gatsby-transformer-sharp gatsby-plugin-sharp

# This library will allow us to add a manifest (in particular, a favicon) to our site.
npm i gatsby-plugin-manifest
```
<br>

For these plugins to take effect, we need to declare them in `gatsby-config.js` in the root of the project. We can add the plugins as string values to the `plugins` attribute of the `module.export`, or we can specify options and sub-plugins by adding an object to the `plugins` array and resolving it by name. You can add as many as you want to add extra functionality to your website.

<br>

```javascript
// gatsby-config.js
module.exports = {
  siteMetadata: { ... },
  plugins: [
    'plugin-name',
    ...
    {
      resolve: 'plugin-name',
      options: {
        plugins: [ /* more plugins here */ ]
      }
    }
  ]
}

```
<br>

Have a look at the `gatsby-config.js` in my project [here](https://github.com/JamesDHW/blog/blob/master/gatsby-config.js). I also required a small extra commit to set up my code block formatting - you can find that [here](https://github.com/JamesDHW/blog/commit/dd49cd2c219572a9e6c3f75badc54a33161fa2f8)

Now that we've configured the plugins we're going to be using, we can create some basic components to use in our project.

`src/pages/index.js` will be our homepage where we'll see the blog previews. I'll let you create a page that you're happy with here (I'm using [`styled-components`](https://styled-components.com/) and [`blueprint.js`](https://blueprintjs.com/docs/) for styling and basic components, but use what you're comfortable with). [Here're the changes I made](https://github.com/JamesDHW/blog/commit/af6933b8537615e3397de23fdd463e02932c6f7f).

Next, we'll also want to create a component to display the preview of each blog article - our homepage will render some small cards with a preview image and title. Create a `src/components` directory and create a new card-like component for this:

<br>

```jsx
// src/components/BlogPreviewCard/BlogPreviewCard.jsx
import { navigate } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const BlogPreviewCard = ({ 
  title,
  slug,
  thumbnail,
  thumbnail_alt,
  author,
  minsToRead,
  datePublished,
}) => { 
  const navigateToPost = () => navigate(slug)
  return (
    <StyledCard onClick={navigateToPost}>
      <GatsbyImage image={getImage(thumbnail)} />
      {/* Write some code here that uses the props and returns a card component */}
    </StyledCard>
  )
}
```
<br>

We will pass the correct props through to the component later. The important thing to understand is that the `slug` is the location of the markdown file you want to show and when we navigate to this address we see the blog post. 

To render images in your React code, you can use `gatsby-plugin-image`.

You can find the preview card I made [here](https://github.com/JamesDHW/blog/blob/master/src/components/BlogPreviewCard/BlogPreviewCard.jsx).


## Step 3 - Write your first article

Create a new file called `src/blog/article-one/index.md` and add the metadata as below:

<br>

```
---
title: "Article One"
slug: blog/article-one
thumbnail: "./thumbnail.png"
thumbnail_alt: "thumbnail description"
author: "Your name"
date: 2021-08-01
---

<the-body-of-your-article-goes-here>
```
<br>

You will also need to add in a new file called `src/blog/article-one/thumbnail.png` which will be a thumbnail image for your article.

## Step 4 - Understanding Gatsby and GraphQL

Gatsby allows you to use GraphQL to query site data, however Gatsby abstracts some of the boilerplate away for us, so we need to do our queries in a particular way. We are going to have two main queries on our site: one for our homepage, where we query all the metadata and thumbnails of our articles; and one on our blog post page to get the content of the blog post.

In both of these components we need to export a `graphql` query for the page. In the background, when generating the pages, Gatsby runs the query and injects the result into the page component (exported as `default`). This gets passed in as the `data` prop.

<br>

```jsx
import { graphql } from 'gatsby';

const SomeComponent = ({ data }) => { ... }
export default SomeComponent;

export const query = graphql`
  // Quey goes here
`;
```
<br>

If you're looking to find the schema for your Gatsby site, you can go to [http://localhost:8000/___graphql](http://localhost:8000/___graphql) to play around with the sandbox and find what the queries should look like. You can then copy and paste the correct query that you want to pass into your component into your code.

Let's return to `index.js` (if you've already added something there) and add a query to the page which will grab all the information we need to show our blog summaries:

<br>

```jsx
// src/pages/index.js
import { graphql } from 'gatsby';
import { BlogPreviewCard } from '../components/BlogPreviewCard/BlogPreviewCard'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => (
  <SiteLayout>
    ...
    {edges.map(({
        node: {
          frontmatter: { slug, ..., thumbnail },
          timeToRead
        }
      }) => (
      <BlogPreviewCard slug={slug} ... thumbnail={thumbnail} />
    ))}
  </SiteLayout>
)
export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          timeToRead
          frontmatter {
            slug
            title
            date
            author
            thumbnail_alt
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`
```
<br>

Now Gatsby is querying data from all our `MarkdownRemark`s and passing the information through to the `IndexPage` to show all our blog previews.

## Step 5 - Generating pages from markdown files

As Gatsby serves static websites, all the pages that we want to generate dynamically get created at build-time. Gatsby will run any script held within the `gatsby-node.js` file on build of the project - this is where we will tell Gatsby to generate our pages.

<br>

```javascript
// gatsby-node.js
const path = require(`path`)

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      allMarkdownRemark: { edges }
    }
  } = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  edges.forEach(
    ({
      node: {
        frontmatter: { slug }
      }
    }) => {
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/BlogPost/BlogPost.jsx`),
        context: { slug }
      })
    }
  )
}
```
<br>

We'll now go on to create the actual template component for our actual blog post page that we've used to create a page from. 

## Step 6 - Create our blog post template

This will be very simple as we'll mostly be showing some parsed HTML. Create a `src/templates/BlogPost/BlogPost.jsx` file and create a `BlogPost` component. I've included a snippet below, but you can make this however you like.

<br>

```jsx
// src/templates/BlogPost/BlogPost.jsx
import { StaticImage } from 'gatsby-plugin-image'

const BlogPost = ({
    data: { 
        markdownRemark: { html } 
    }}
) => (
    <SiteLayout>
      ...
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </SiteLayout>
)
export default BlogPost

// You can also grab any extra fields from the frontmatter that you need
export const query = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        ...
      }
    }
  }
`
```
<br>

The important thing to understand here is that Gatsby is using the `gatsby-transformer-remark` plugin to transform our markdown file into HTML, which is being passed to our template component and rendered using `dangerouslySetInnerHTML={{ __html: html }}`.

We now have a main page which queries all the markdown files and displays a preview for each one based on the metadata. When we click on the card, it navigates us to the correct blog post. We also have a page being generated for each blog post which we've written.

Run `npm run develop` to see your site locally and check that you can see a blog preview which links to your new article.

## Step 7 - Deploy to GitHub Pages

We will be using the `gh-pages` library to help us deploy to GitHub Pages.

<br>

```bash
npm install gh-pages --save-dev
```
<br>

Let's add a deploy script to our `package.json` which we can run every time we want to publish our site.

<br>

```json
{
  ...
  "scripts": {
    "deploy": "gatsby clean && gatsby build --prefix-paths && gh-pages -d public -b gh-pages",
    ...
  },
  "dependencies": { ... }
}
```
<br>

We can now deploy whenever we want by running `npm run deploy`.

This script clears the project cache and creates a new build. In my `gatsby-config.js`, I have a path parameter set `pathPrefix: '/blog'` which sets the path prefix. The script then builds with `gh-pages`, taking from the `public` directory that `gatsby build` created and pushes the result to a branch on the remote called `gh-pages`.

We can now go to our remote repo on GitHub and should see a new `gh-pages` branch. Now all we need to do is configure the pages site of the repo. This is done by doing to `Settings > Pages` in our repo and setting the `Source` to `Branch: gh-pages`, `/(root)`. 

<br>

![GitHub Pages settings](/src/blog/2021/08/building-your-own-blog-with-gatsby-and-github-pages/github-pages.png)

<br>

After a few minutes your site will be deployed!

## Summary

After following this article, you should have learned:

 - How to generate a new Gatsby project.
 - How to add and configure Gatsby plugins to customise your site.
 - How to query Gatsby site data through GraphQL.
 - How to dynamically generate pages from a template.
 - How to deploy a Gatsby project to GitHub Pages.

You can use this knowledge to add more pages and plugins to customise the blog to however you like.

If you want a quick-start to your project, you can clone [my GitHub repo](https://github.com/JamesDHW/blog) and customise the styling to your liking. If you don't want to clone the repo but just explore the code, go to the repo and press "`.`" when you're on the website - this will open up a VS Code window to view the code.
