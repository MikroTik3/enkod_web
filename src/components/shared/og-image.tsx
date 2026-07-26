import { ImageResponse } from 'next/og'

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

interface OgPage {
       title: string
       description: string
       slug: string[]
}

interface OgImageProps {
       params: Promise<{
              slug: string[]
       }>
}

export const GET = async (_request: Request, props: OgImageProps) => {

}