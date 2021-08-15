module.exports = {
  siteMetadata: {
    siteUrl: 'https://jamesdhw.github.io/blog/',
    title: "James' Blog",
    description: 'A blog'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-remark-images',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'JamesDHW Blog',
        short_name: 'JamesDHW Blog',
        start_url: '/',
        background_color: '#293742',
        icon: 'src/images/icons/GitHub.png'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/blog`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: 'carbon',
              theme: 'material',
              lineNumbers: true
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ],
  pathPrefix: '/blog'
}
