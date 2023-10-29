addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Get the client's IP, country, and ASN
  const clientIP = request.headers.get('cf-connecting-ip');
  const country = request.headers.get('cf-ipcountry');
  const asn = request.headers.get('cf-ray').split('-')[0];

  // Check if the country is not Singapore
  if (country !== 'SG') {
    // Redirect to 1.1.1.1
    return Response.redirect('https://1.1.1.1/', 302);
  }

  // If the country is Singapore, respond with an HTML message
  const responseText = `<html><body>This is your ${clientIP} and you are accessing this site from ${country} | ${asn}.</body></html>`;
  return new Response(responseText, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
