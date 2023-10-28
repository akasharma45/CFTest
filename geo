addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const clientIP = request.headers.get('cf-connecting-ip');
  const country = request.headers.get('cf-ipcountry');
  const asn = request.headers.get('cf-ray').split('-')[0];

  const htmlResponse = `<html>
  <head>
    <title>Client Information</title>
  </head>
  <body>
    <h1>This is your ${clientIP} and you are accessing this site from ${country} | ${asn}</h1>
  </body>
  </html>`;

  return new Response(htmlResponse, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
