export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
      console.log('Making request to ' + config.url)
    })
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      if (code === 404) {
        redirect('/error/404')
      }
      else if (code === 500) {
        redirect('/error/500')
      }
    })
  }