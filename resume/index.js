function bodyLoad() {
  updateCookies()
  document.getElementsByTagName('html')[0].setAttribute('theme', cookies['theme'] || 'light')
}

function updateCookies() {
  cookies = document.cookie?.split(';').map(cookie => cookie.split('=')).reduce((obj, pair) => {obj[pair[0]] = pair[1]; return obj;}, {}) || {}
}

let cookies = {};

function buttonClick(event) {
  document.cookie = `theme=${cookies['theme'] === 'light' ? 'dark' : 'light'}`
  updateCookies()
  document.getElementsByTagName('html')[0].setAttribute('theme', cookies['theme'])
}
bodyLoad()
