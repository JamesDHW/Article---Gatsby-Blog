import * as React from "react"
import { SiteLayout } from '../components/SiteLayout/SiteLayout'
import { Title } from '../stylesheet'
import styled from 'styled-components'

const ErrorContainer = styled.div`
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const NotFoundPage = () => {
  return (
    <SiteLayout>
      <ErrorContainer>
        <Title>😧</Title>
        <Title>I'm sorry, I couldn't find that page for you!</Title>
      </ErrorContainer>
    </SiteLayout>
  )
}

export default NotFoundPage
