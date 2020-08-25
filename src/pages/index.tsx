import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'

type PageQuery = {
  file: {
    childMarkdownRemark: {
      html: string
      frontmatter: {
        siteTitle: string
        siteDescription: string
        fbImage: string
        twitterImage: string
        twitterUsername: string
        siteUrl: string
      }
    }
  }
}

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "home.md" }) {
      childMarkdownRemark {
        html
      }
    }
  }
`

type PageData = {
  body: string
}

const transformQuery = (query: PageQuery): PageData => {
  return {
    body: query.file.childMarkdownRemark.html,
  }
}

export const HomePage: React.FC<{ page: PageData }> = ({ page }) => {
  return <div dangerouslySetInnerHTML={{ __html: page.body }} />
}

export default ({ data }: { data: PageQuery }): React.ReactNode => {
  const page = transformQuery(data)
  return (
    <>
      <SEO />
      <HomePage page={page} />
    </>
  )
}
