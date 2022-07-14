import StorageService from './services/storage-service.js'
import CrudService from './services/crud-service.js'
import ObserverService from './services/observer-service.js'

ready((event) => {
  window.onbeforeunload = function () {
    if (sessionStorage.getItem('preventScrollToTop') === '1') {
      sessionStorage.setItem('preventScrollToTop', null)
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })
    }
  }
})

StorageService.init()
CrudService.createPage()
ObserverService.observeBigTypeMessages()
allowObserverCallback()
window.c = CrudService
window.s = StorageService
window.o = ObserverService

function ready(fn) {
  if (document.readyState != 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function allowObserverCallback() {
  await sleep(1000)
  StorageService.preventObserverCallback = false
}
