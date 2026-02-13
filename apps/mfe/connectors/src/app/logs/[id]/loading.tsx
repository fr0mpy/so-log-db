import { Spinner } from '@stackone-ui/core/spinner'
import { LoadingStyles } from '../../../styles'

export default function Loading() {
  return (
    <div className={LoadingStyles.page}>
      <Spinner size="lg" />
    </div>
  )
}
