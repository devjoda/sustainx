import CrudService from './crud-service.js'
import VerboseService from './verbose-service.js'

/**
 * @description
 * Service metoder til at håndtere lagring af objekter
 * @export
 * @class StorageService
 */
export default class StorageService {
  static pathnames = {
    'sustainx/': 'home',
    index: 'home',
    services: 'services',
    work: 'work',
    about: 'about',
    people: 'people',
    jobs: 'jobs',
    contact: 'contact',
    distilled: 'distilled',
    privacy: 'privacy',
    'sustainability-management': 'sustainability-management',
    'sustainability-networks': 'sustainability-networks',
    'sustainability-education': 'sustainability-education',
    'act-network': 'act-network',
    'momentum-network': 'momentum-network',
    'globus-wine': 'globus-wine',
    polytech: 'polytech',
    svanehoej: 'svanehoej',
  }
  static page = null
  static domElements = new Map()
  static observers = new Set()
  static employees = new Set()
  static swipers = new Set()
  static verbose = true
  static previousPageYOffset = 0
  static scrollDirection = 'down'

  static init() {
    CrudService.createAllDomElements()
    VerboseService.print('StorageService initialised')
  }
}
