import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO: React.FC = () => {
  const query = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "seo.json" }) {
          childContentJson {
            siteTitle
            siteUrl
            siteDescription
            fbImage
            twitterImage
            twitterUsername
          }
        }
      }
    `,
  )

  return (
    <Helmet
      title={query.file.childContentJson.siteTitle}
      titleTemplate={'%s'}
      meta={[
        {
          name: 'description',
          content: query.file.childContentJson.siteDescription,
        },
        {
          property: 'image',
          content:
            query.file.childContentJson.siteUrl +
            '/' +
            query.file.childContentJson.fbImage,
        },
        {
          property: 'og:title',
          content: query.file.childContentJson.siteTitle,
        },
        {
          property: 'og:description',
          content: query.file.childContentJson.siteDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content:
            query.file.childContentJson.siteUrl +
            '/' +
            query.file.childContentJson.fbImage,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: query.file.childContentJson.twitterUsername,
        },
        {
          name: 'twitter:title',
          content: query.file.childContentJson.siteTitle,
        },
        {
          name: 'twitter:description',
          content: query.file.childContentJson.siteDescription,
        },
        {
          name: 'twitter:image',
          content:
            query.file.childContentJson.siteUrl +
            '/' +
            query.file.childContentJson.twitterImage,
        },
      ]}
    />
  )
}

export default SEO
