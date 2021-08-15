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
