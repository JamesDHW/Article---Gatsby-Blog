import styled from 'styled-components'
import { H1, H3 } from '@blueprintjs/core'
import { Divider } from '@blueprintjs/core'

export const getSpacing = interval => `${5 * interval}px`

export const Title = styled(H1)`
  font-size: 75px !important;
  text-align: center;
`
export const Subtitle = styled(H3)`
  margin: ${getSpacing(5)} 0;
  text-align: center;
`
export const Line = styled(Divider)`
  margin: ${getSpacing(5)};
`
