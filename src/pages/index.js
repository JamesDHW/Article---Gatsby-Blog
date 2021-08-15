import * as React from 'react'
import { SiteLayout } from '../components/SiteLayout/SiteLayout'
import { BlogPreviewCard } from '../components/BlogPreviewCard/BlogPreviewCard'
import { Title, Line } from '../stylesheet'

import './index.css'

const IndexPage = () => {
  return (
    <SiteLayout>
      <Title>Articles</Title>
      <Line />
      {/* <BlogPreviewCard /> will go here */}
    </SiteLayout>
  )
}
export default IndexPage
