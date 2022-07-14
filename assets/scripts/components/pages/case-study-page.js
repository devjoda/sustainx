import Page from './page.js'
import EventListenerService from '../../services/event-listener-service.js'
import ObserverService from '../../services/observer-service.js'

/**
 * @description
 * Repræsenterer et CaseStudyPage-objekt. Klassen er en child-klasse til Page-klassen.
 * @export
 * @class CaseStudyPage
 * @extends {Page}
 */
export default class CaseStudyPage extends Page {
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
    console.log(`${super.siteLogoThemeColor}`)

    ObserverService.observe(
      '#observer-wrapper',
      false,
      null,
      1,
      '150px 0px -900px 0px',
      [`${super.bodyThemeColor}-light-1`, `${super.bodyThemeColor}`],
      [`${super.bodyThemeColor}`, 'light-1'],
      [`${super.bodyThemeColor}`, 'light-1']
    )
    ObserverService.observe(
      '#footer',
      false,
      null,
      0,
      '500px 0px -500px 0px',
      ['accent-1', `${this.bodyThemeColor}`],
      ['accent-1', `${super.siteLogoThemeColor}`],
      ['accent-1', `${super.menuItemsThemeColor}`]
    )
  }
}
