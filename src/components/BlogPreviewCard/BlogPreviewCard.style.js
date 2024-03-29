import styled from 'styled-components'
import { getSpacing } from '../../stylesheet'
import { Card, Icon } from '@blueprintjs/core'

export const InfoSpan = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 420px) {
    flex-direction: column;
    margin-left: ${getSpacing(5)};
  }
`
export const StyledIcon = styled(Icon)`
  margin-right: ${getSpacing(2)};
`
export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${getSpacing(10)};
  max-width: 800px;
`
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${getSpacing(2)};
`
