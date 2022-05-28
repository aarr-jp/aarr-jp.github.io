import { type FC } from 'react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import useBaseUrl from '@/util/hooks/useBaseUrl'

type SeoProps = Readonly<{
  title: string
  description: string
}>

const Seo: FC<SeoProps> = seoProps => {
  const { asPath } = useRouter()
  const href = `${useBaseUrl()}${asPath}`

  return (
    <NextSeo
      {...seoProps}
      openGraph={{
        url: href,
        type: asPath === '/' ? 'website' : 'article',
        images: [
          {
            url: `${useBaseUrl()}/images/ogp-image.png`,
            width: 560,
            height: 315,
            alt: 'ogp image',
            type: 'image/png'
          }
        ]
      }}
    />
  )
}

export default Seo
export { type SeoProps }