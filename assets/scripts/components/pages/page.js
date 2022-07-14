import StorageService from '../../services/storage-service.js'
import VerboseService from '../../services/verbose-service.js'
import BigTypeMessageSection from '../big-type-message-section.js'

/**
 * @description Repræsenterer et Page-objekt
 * @export
 * @class Page
 */
export default class Page {
  /**
   * Opretter en instance af Page.
   * @param {String} pageName
   * @memberof Page
   */
  constructor(pageName, bodyThemeColor, siteLogoThemeColor, menuItemsThemeColor) {
    this._pageName = pageName
    this._bodyThemeColor = bodyThemeColor
    this._siteLogoThemeColor = siteLogoThemeColor
    this._menuItemsThemeColor = menuItemsThemeColor
    this._bigTypeMessageSections = []
  }

  get bodyThemeColor() {
    return this._bodyThemeColor
  }

  set bodyThemeColor(x) {
    if (this._bodyThemeColor !== x) this._bodyThemeColor = x
  }

  get siteLogoThemeColor() {
    return this._siteLogoThemeColor
  }

  set siteLogoThemeColor(x) {
    if (this._siteLogoThemeColor !== x) this._siteLogoThemeColor = x
  }

  get menuItemsThemeColor() {
    return this._menuItemsThemeColor
  }

  set menuItemsThemeColor(x) {
    if (this._menuItemsThemeColor !== x) this._menuItemsThemeColor = x
  }

  get pageName() {
    return this._pageName
  }

  set pageName(x) {
    if (this._pageName !== x) this._pageName = x
  }

  get bigTypeMessageSections() {
    return this._bigTypeMessageSections
  }

  set bigTypeMessageSections(x) {
    if (this._bigTypeMessageSections !== x) this._bigTypeMessageSections = x
  }

  updateCopyrightYear() {
    const year = document.querySelector('#year')
    if (!year) {
      return false
    }
    document.querySelector('#year').innerText = new Date().getFullYear()
    VerboseService.print('Updated copyright year')
  }

  updateThemeColors() {
    const body = StorageService.domElements.get('body')
    const mainNavigation = StorageService.domElements.get('main-navigation')
    const mainHeader = StorageService.domElements.get('main-header')
    if (!body || !mainNavigation || !mainHeader) {
      return false
    }
    body.className = `${this._bodyThemeColor}`
    mainHeader.className = `${this._siteLogoThemeColor} transparent`
    mainNavigation.className = `${this._menuItemsThemeColor}`
    VerboseService.print('Updated theme colors')
  }

  /**
   * @description
   * Metode som finder alle Big Type Message sections og instantierer dem
   * @return {Object}
   * @memberof Page
   */
  initBygTypeMessageSections() {
    const domElements = document.querySelectorAll('.big-type-message-section')
    if (domElements.length === 0) {
      return false
    }
    for (const domElement of domElements) {
      const bigTypeMessageSection = new BigTypeMessageSection(domElement)
      this._bigTypeMessageSections.push(bigTypeMessageSection)
    }
    return true
  }
}
