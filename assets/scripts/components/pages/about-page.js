import Page from './page.js'
import EventListenerService from '../../services/event-listener-service.js'
import ObserverService from '../../services/observer-service.js'

/**
 * @description
 * Repræsenterer et AboutPage-objekt. Klassen er en child-klasse til Page-klassen.
 * @export
 * @class AboutPage
 * @extends {Page}
 */
export default class AboutPage extends Page {
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
    ObserverService.observeFooter()
    ObserverService.observe(
      '#people-section',
      false,
      null,
      1,
      '300px 0px -900px 0px',
      ['light-1', 'dark-1'],
      ['light-1', 'dark-1'],
      ['dark-1', 'light-1']
    )
  }
}
