import styled from 'styled-components'
import { getSpacing } from '../../stylesheet'
import { GatsbyImage } from 'gatsby-plugin-image'

export const HeaderImg = styled(GatsbyImage)`
  margin-top: ${getSpacing(5)};
  margin-bottom: ${getSpacing(5)};
`
