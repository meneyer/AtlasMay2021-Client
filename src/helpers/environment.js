let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break
    case 'atlas-pilot-client.herokuapp.com':
        APIURL = 'https://atlas-pilot-server.herokuapp.com'
}

export default APIURL