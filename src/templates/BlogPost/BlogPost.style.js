import styled from 'styled-components'
import { getSpacing } from '../../stylesheet'
import { GatsbyImage } from 'gatsby-plugin-image'

export const HeaderImg = styled(GatsbyImage)`
  margin-bottom: ${getSpacing(5)};
`
