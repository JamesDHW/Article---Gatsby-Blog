import * as React from 'react'
import { navigate } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Subtitle, Line } from '../../stylesheet'
import {
  InfoSpan,
  StyledCard,
  StyledIcon,
  IconContainer
} from './BlogPreviewCard.style'

export const BlogPreviewCard = ({
  title,
  slug,
  thumbnail,
  thumbnail_alt,
  author,
  minsToRead,
  datePublished
}) => {
  const displayDate = new Date(datePublished).toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric'
  })
  const onNavigate = () => navigate(slug)
  return (
    <StyledCard elevation={2} interactive={true} onClick={onNavigate}>
      <GatsbyImage image={getImage(thumbnail)} alt={thumbnail_alt} />
      <Subtitle>{title}</Subtitle>
      <Line />
      <InfoSpan>
        <IconContainer>
          <StyledIcon color="white" icon="calendar" />
          {displayDate}
        </IconContainer>
        <IconContainer>
          <StyledIcon color="white" icon="person" />
          {author}
        </IconContainer>
        <IconContainer>
          <StyledIcon color="white" icon="time" />
          {minsToRead} mins to read
        </IconContainer>
      </InfoSpan>
    </StyledCard>
  )
}
