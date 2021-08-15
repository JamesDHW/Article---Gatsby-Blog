import * as React from 'react'
import { graphql } from 'gatsby'
import { SiteLayout } from '../components/SiteLayout/SiteLayout'
import { BlogPreviewCard } from '../components/BlogPreviewCard/BlogPreviewCard'
import { Title, Line } from '../stylesheet'

import './index.css'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => (
  <SiteLayout>
    <Title>Articles</Title>
    <Line />
    {edges.map(
      ({
        node: {
          frontmatter: { slug, title, author, date, thumbnail_alt, thumbnail },
          timeToRead
        }
      }) => (
        <BlogPreviewCard
          slug={slug}
          title={title}
          author={author}
          thumbnail={thumbnail}
          thumbnail_alt={thumbnail_alt}
          minsToRead={timeToRead}
          datePublished={date}
        />
      )
    )}
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
