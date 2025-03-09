// utils/pkce.js
export function generatePKCE() {
    const verifier = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
    const encoder = new TextEncoder();
    return crypto.subtle.digest('SHA-256', encoder.encode(verifier)).then(hash => {
      let challenge = btoa(String.fromCharCode(...new Uint8Array(hash)))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
      return { verifier, challenge };
    });
  }
  