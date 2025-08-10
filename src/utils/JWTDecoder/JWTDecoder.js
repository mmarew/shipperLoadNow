function base64UrlDecode(base64Url) {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}
function decodeJWT(token) {
  if (token == null) return 'no token';
  const payload = token?.split('.')[1];
  if (payload) return base64UrlDecode(payload);
  else return 'no payload';
}

export default decodeJWT;
