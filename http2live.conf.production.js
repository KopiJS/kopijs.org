module.exports = {
  hosts: [
    {
      domain: 'kopijs.http2.live',
      manifest: [
        {
          glob: '**/*.html',
          push: [
            '/favicon.ico',
            '/assets/**/*.{png,svg,jpg,css,js}'
          ]
        }
      ]
    }
  ]
}
