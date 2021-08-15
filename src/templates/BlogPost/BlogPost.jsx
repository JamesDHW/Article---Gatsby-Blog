import * as React from 'react'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { SiteLayout } from '../../components/SiteLayout/SiteLayout'
import { H1 } from '@blueprintjs/core'
import { HeaderImg } from './BlogPost.style'

const BlogPost = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, thumbnail }
    }
  }
}) => {
  return (
    <SiteLayout>
      <HeaderImg image={getImage(thumbnail)} />
      <H1>{title}</H1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </SiteLayout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
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
`
export default BlogPost
