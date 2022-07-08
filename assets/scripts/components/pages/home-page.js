import Page from './page.js'
import EventListenerService from '../../services/event-listener-service.js'
import ObserverService from '../../services/observer-service.js'
import CrudService from '../../services/crud-service.js'

/**
 * @description
 * Repræsenterer et HomePage-objekt. Klassen er en child-klasse til Page-klassen.
 * @export
 * @class HomePage
 * @extends {Page}
 */
export default class HomePage extends Page {
  constructor(pageName, bigTypeMessageSections, bodyThemeColor, siteLogoThemeColor, menuItemsThemeColor) {
    super(pageName, bigTypeMessageSections, bodyThemeColor, siteLogoThemeColor, menuItemsThemeColor)
    super.updateThemeColors()
    super.updateCopyrightYear()
    super.initBygTypeMessageSections()
    this.init()
  }

  init() {
    EventListenerService.hideFadeOverlay()
    CrudService.createSwiper()
    EventListenerService.onClickBurgerClose()
    EventListenerService.onClickBurgerOpen()
    EventListenerService.onClickTop()
    EventListenerService.onEndedForceReplayVideos()
    EventListenerService.bindOnClick()
    ObserverService.observeHero()
    ObserverService.observeFooter()
    ObserverService.observe(
      '#insights-section',
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
