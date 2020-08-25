import React from 'react'
import type { CmsConfig } from 'netlify-cms-core'
import CMS from 'netlify-cms-app'
import ColorWidget from 'netlify-cms-widget-color/dist/es/color'
import { HomePage } from '../pages/index'
import remark from 'remark'
import html from 'remark-html'
import { StyleSheetManager } from 'styled-components'

CMS.registerWidget('color', ColorWidget.Control)

const PreviewStyleManager: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [iframeRef, setIframeRef] = React.useState<HTMLHeadElement | null>(null)

  React.useEffect(() => {
    const iframe = document.getElementsByTagName('iframe')[0]
    const iframeHeadElem = iframe?.contentDocument?.head ?? null
    setIframeRef(iframeHeadElem)
  }, [])

  return (
    iframeRef && (
      <StyleSheetManager target={iframeRef}>{children}</StyleSheetManager>
    )
  )
}

CMS.registerPreviewTemplate('home', ({ entry }) => {
  const cmsData = React.useMemo(() => entry.toJS(), [entry])

  const imageMap = React.useMemo(() => {
    return new Map<string, string>(
      cmsData.mediaFiles.map((image: any) => {
        return [
          image.path.replace('static/', ''),
          typeof image.displayURL === 'string'
            ? image.displayURL
            : '/' + image.displayURL.path.replace('static/', ''),
        ]
      }),
    )
  }, [cmsData])

  const page = React.useMemo(
    () => ({
      body: remark()
        .use({ settings: { gfm: true } })
        .use((html as unknown) as any)
        .processSync(cmsData.data.body)
        .toString(),
    }),
    [cmsData, imageMap],
  )

  return (
    <PreviewStyleManager>
      <HomePage page={page} />
    </PreviewStyleManager>
  )
})

CMS.init({
  config: ({
    backend: {
      name: 'github',
      repo: 'sunrisemovement/winning-the-gnd-microsite',
      branch: 'main',
    },
    local_backend: window.location.hostname === 'localhost',
  } as unknown) as CmsConfig,
})
