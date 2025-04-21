import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html>
      <Head>
        {/* Cloudflare Web Analytics snippet */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "00000000-0000-0000-0000-000000000000"}'
        ></script>

        {/* If you switch to Plausible, replace with this: */}
        {/* 
        <script
          async
          defer
          data-domain="moyoverse.vercel.app"
          src="https://plausible.io/js/plausible.js"
        ></script>
        */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
