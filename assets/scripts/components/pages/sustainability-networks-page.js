import Page from './page.js'
import EventListenerService from '../../services/event-listener-service.js'
import ObserverService from '../../services/observer-service.js'

/**
 * @description
 * Repræsenterer et SustainabilityNetworksPage-objekt. Klassen er en child-klasse til Page-klassen.
 * @export
 * @class SustainabilityNetworksPage
 * @extends {Page}
 */
export default class SustainabilityNetworksPage extends Page {
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
      '#big-type-message-section-1',
      false,
      null,
      0,
      '1400px 0px -600px 0px',
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
