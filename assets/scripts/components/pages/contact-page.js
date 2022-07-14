import Page from './page.js'
import EventListenerService from '../../services/event-listener-service.js'
import ObserverService from '../../services/observer-service.js'
import CrudService from '../../services/crud-service.js'
import StorageService from '../../services/storage-service.js'

/**
 * @description
 * Repræsenterer et ContactPage-objekt. Klassen er en child-klasse til Contact-klassen.
 * @export
 * @class ContactPage
 * @extends {Page}
 */
export default class ContactPage extends Page {
  constructor(pageName, bigTypeMessageSections, bodyThemeColor, siteLogoThemeColor, menuItemsThemeColor) {
    super(pageName, bigTypeMessageSections, bodyThemeColor, siteLogoThemeColor, menuItemsThemeColor)
    super.updateThemeColors()
    super.updateCopyrightYear()
    super.initBygTypeMessageSections()
    this.init()
  }

  init() {
    EventListenerService.hideFadeOverlay()
    EventListenerService.onClickBurgerClose()
    EventListenerService.onClickBurgerOpen()
    EventListenerService.onClickTop()
    EventListenerService.bindOnClick()
    ObserverService.observeHero()
    ObserverService.observe(
      '#offices-section',
      false,
      null,
      1,
      '300px 0px -900px 0px',
      ['light-1', 'dark-1'],
      ['light-1', 'dark-1'],
      ['dark-1', 'light-1']
    )
    ObserverService.observe(
      '#footer',
      false,
      null,
      0,
      '500px 0px -500px 0px',
      ['accent-1', 'light-1'],
      ['accent-1', 'dark-1'],
      ['accent-1', 'dark-1']
    )
  }
}
