module.exports = {
  hosts: [
    {
      domain: 'localhost',
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
