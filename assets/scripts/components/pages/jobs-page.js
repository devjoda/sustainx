import Page from './page.js'
import EventListenerService from '../../services/event-listener-service.js'
import ObserverService from '../../services/observer-service.js'
import CrudService from '../../services/crud-service.js'
import StorageService from '../../services/storage-service.js'

/**
 * @description
 * Repræsenterer et JobsPage-objekt. Klassen er en child-klasse til Page-klassen.
 * @export
 * @class JobsPage
 * @extends {Page}
 */
export default class JobsPage extends Page {
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
    EventListenerService.toggleSiteLogoThemeColors(['dark-1', 'light-1'])
    CrudService.createAllJobOpportunities()
    this.renderJobOpportunities()
    ObserverService.observeHero(['dark-1', 'light-1'])
    ObserverService.observe(
      '#unsolicited-applications-section',
      false,
      null,
      1,
      '300px 0px -900px 0px',
      ['light-1', 'dark-1'],
      ['dark-1', 'light-1'],
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

  renderJobOpportunities() {
    const jobOpportunitiesWrapper = document.querySelector('.grid-list.job-opportunities-wrapper')
    jobOpportunitiesWrapper.innerHTML = ''
    for (const jobOpportunity of StorageService.jobOpportunities) {
      jobOpportunitiesWrapper.innerHTML += /*html*/ `
        <li class="grid-list-item">
            <a href="${jobOpportunity.link}">
                <p class="primary">${jobOpportunity.position}</p>
                <div class="svg-wrapper">
                    <svg class="cta-icon" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10.5" r="10" fill="#29FE85" />
                        <path
                            d="M12 10.5L12.7071 11.2071L13.4142 10.5L12.7071 9.79289L12 10.5ZM8.29289 8.20711L11.2929 11.2071L12.7071 9.79289L9.70711 6.79289L8.29289 8.20711ZM11.2929 9.79289L8.29289 12.7929L9.70711 14.2071L12.7071 11.2071L11.2929 9.79289Z"
                            fill="#181818" />
                    </svg>
                </div>
            </a>
            </a>
        </li>
      `
    }
  }
}
