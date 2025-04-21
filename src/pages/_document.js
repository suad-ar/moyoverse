import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          defer
          data-domain="moyoverse.vercel.app"
          src="https://plausible.io/js/script.outbound-links.tagged-events.js"
        ></script>
       
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
