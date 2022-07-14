import Page from './page.js'
import EventListenerService from '../../services/event-listener-service.js'
import ObserverService from '../../services/observer-service.js'

/**
 * @description
 * Repræsenterer et SustainabilityManagementPage-objekt. Klassen er en child-klasse til Page-klassen.
 * @export
 * @class SustainabilityManagementPage
 * @extends {Page}
 */
export default class SustainabilityManagementPage extends Page {
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
    EventListenerService.toggleSiteLogoThemeColors(['light-1', 'dark-1'])
    ObserverService.observeHero(['light-1', 'dark-1'])
    ObserverService.observe(
      '#the-strategy-house-section',
      false,
      null,
      1,
      '600px 0px -800px 0px',
      ['dark-1', `${this.bodyThemeColor}`],
      ['light-1', `dark-1`],
      ['light-1', `dark-1`]
    )
    ObserverService.observe(
      '#observer-wrapper',
      false,
      null,
      1,
      '600px 0px -800px 0px',
      ['dark-1', `${this.bodyThemeColor}`],
      ['light-1', `dark-1`],
      ['light-1', `dark-1`]
    )
    ObserverService.observe(
      '#footer',
      false,
      null,
      0,
      '500px 0px -500px 0px',
      ['accent-1', 'dark-1'],
      ['accent-1', 'light-1'],
      ['accent-1', 'light-1']
    )
    this.initInteractiveModels('#the-strategy-house', '#the-strategy-house', '#people-and-values', 'g')
    this.initInteractiveModels('#the-subscription', '#the-subscription', '#plan-and-prepare', 'div.activity')
  }

  initInteractiveModels(resetSelector, clearSelector, defaultSelectedSelector, groupElementTag) {
    const groupElements = document.querySelectorAll(`${resetSelector} ${groupElementTag}`)
    this.clearInteractiveModel(clearSelector, groupElementTag)
    this.setActiveGroupElement(`${defaultSelectedSelector}`)
    for (const groupElement of groupElements) {
      groupElement.addEventListener('mousedown', (e) => {
        console.log(`#${e.currentTarget.id}`)
        this.clearInteractiveModel(clearSelector, groupElementTag)
        this.setActiveGroupElement(`#${e.currentTarget.id}`)
      })
    }
  }

  clearInteractiveModel(selector, groupElementTag) {
    this.resetGroupElementBgColor(selector, groupElementTag)
    this.hideTextElements(selector)
  }

  resetGroupElementBgColor(selector, groupElementTag) {
    const groupElements = document.querySelectorAll(`${selector} ${groupElementTag} .bg`)
    for (const groupElement of groupElements) {
      groupElement.classList.remove('active')
      // setAttribute('style', `${cssRule}: ${fillColor};`)
    }
  }

  hideTextElements(selector) {
    const textElements = document.querySelectorAll(`${selector} .text-wrapper .text-element`)
    for (const textElement of textElements) {
      textElement.classList.add('hidden')
    }
  }

  setActiveGroupElement(groupElementSelector) {
    // console.log(groupElementSelector)
    const groupElementTarget = document.querySelector(`${groupElementSelector} .bg`)
    // console.log(groupElementTarget)
    const textElementTarget = document.querySelector(`${groupElementSelector}-text`)
    // groupElementTarget.setAttribute('style', `${cssRule}: ${fillColor};`)
    groupElementTarget.classList.add('active')
    textElementTarget.classList.remove('hidden')
  }
}
