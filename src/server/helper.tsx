export const renderHTML = (
  mainFiles,
  content,
  finalState,
  vendorfiles,
  helmet
) => {
  return `
      <!DOCTYPE html>
      <html lang='en'>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
          ${helmet ? helmet.meta.toString() : ''}
          <title>EV MALL</title>
          <link href="/${mainFiles[0]}" rel="stylesheet"/>
        </head>
        <body>
          <div id="app">${content}</div>
          <div id="portal-root"></div>

<script>
window.__PRELOADED_STATE__ = ${(JSON.stringify(finalState) as any).replace(
    /</g,
    '\\u003c'
  )}
</script>
          <script type="text/javascript" src="/${
            vendorfiles[0]
          }" async ></script>
          <script type="text/javascript" src="/${mainFiles[1]}"  defer></script>
        </body>
      </html>
    `;
};
