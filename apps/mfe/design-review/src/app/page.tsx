import { getTranslations } from '@stackone/i18n'
import { DesignReviewClient } from './DesignReviewClient'

export default async function DesignReviewPage() {
  const t = await getTranslations()

  const translations = {
    title: t('designReview.title'),
    overview: t('designReview.overview'),
    screenA: t('designReview.screenA'),
    screenB: t('designReview.screenB'),
    overviewContent: t('designReview.overviewContent'),
  }

  return <DesignReviewClient translations={translations} />
}
