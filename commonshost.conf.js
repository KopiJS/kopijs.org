module.exports = {
  hosts: [
    {
      domain: 'kopijs.org',
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
