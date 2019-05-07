module.exports = {
  hosts: [
    {
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
