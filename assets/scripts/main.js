import StorageService from './services/storage-service.js'
import CrudService from './services/crud-service.js'
import ObserverService from './services/observer-service.js'

ready(() => {
  window.onbeforeunload = function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }
})

StorageService.init()
CrudService.createPage()
ObserverService.observeBigTypeMessages()
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
