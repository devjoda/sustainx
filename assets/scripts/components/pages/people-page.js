import Page from './page.js'
import EventListenerService from '../../services/event-listener-service.js'
import ObserverService from '../../services/observer-service.js'
import CrudService from '../../services/crud-service.js'
import StorageService from '../../services/storage-service.js'

/**
 * @description
 * Repræsenterer et PeoplePage-objekt. Klassen er en child-klasse til Page-klassen.
 * @export
 * @class PeoplePage
 * @extends {Page}
 */
export default class PeoplePage extends Page {
  constructor(pageName, bigTypeMessageSections, bodyThemeColor, siteLogoThemeColor, menuItemsThemeColor) {
    super(pageName, bigTypeMessageSections, bodyThemeColor, siteLogoThemeColor, menuItemsThemeColor)
    super.updateThemeColors()
    super.updateCopyrightYear()
    super.initBygTypeMessageSections()
    this.init()
  }

  init() {
    EventListenerService.hideFadeOverlay()
    CrudService.createAllEmployees()
    EventListenerService.onClickBurgerClose()
    EventListenerService.onClickBurgerOpen()
    EventListenerService.onClickTop()
    EventListenerService.bindOnClick()
    ObserverService.observeHero()
    this.setShowAllOptionChecked()
    this.bindOnChangeOptions()
    this.renderEmployees('*')

    ObserverService.observe(
      '#observer-wrapper',
      false,
      null,
      0,
      '3000px 0px -1500px 0px',
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
      ['accent-1', 'dark-1'],
      ['accent-1', 'light-1'],
      ['accent-1', 'light-1']
    )
  }

  setShowAllOptionChecked() {
    document.querySelector('#show-all-option').checked = true
  }

  bindOnChangeOptions() {
    const fieldSet = document.querySelector('.segmented-control')
    fieldSet.addEventListener('change', (event) => {
      this.renderEmployees(event.target.value)
    })
  }

  renderEmployees(filterOption) {
    const mobileWrapper = document.querySelector('.employee-wrapper.mobile')
    const desktopWrapper = document.querySelector('.employee-wrapper.desktop')
    mobileWrapper.innerHTML = ''
    desktopWrapper.innerHTML = ''
    for (const employee of StorageService.employees) {
      if (filterOption === '*' || employee.workField.includes(filterOption)) {
        mobileWrapper.innerHTML += /*html*/ `
        <li class="grid-list-item">
            <a href="${employee.link}">
                <p class="primary">${employee.firstName} ${employee.lastName} </p>
                <p class="secondary">${employee.workTitle}</p>
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
        desktopWrapper.innerHTML += /*html*/ `
      <li>
          <img src="${employee.featuredImage}" alt="${employee.firstName} ${employee.lastName}, ${employee.workTitle}">
          <p class="full-name">${employee.firstName} <br>${employee.lastName}</p>
          <p class="work-title">${employee.workTitle}</p>
          <a data-no-page-refresh class="phone" href="tel:${employee.phone.replace(/\s+/g, '')}">${employee.phone}</a>
          <a data-no-page-refresh class="email" href="mailto:${employee.email}">${employee.email}</a>
          <a href="${employee.link}" class="call-to-action"><span>Read more</span>
              <svg viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10.5" r="10" fill="#29FE85" />
                  <path
                      d="M12 10.5L12.7071 11.2071L13.4142 10.5L12.7071 9.79289L12 10.5ZM8.29289 8.20711L11.2929 11.2071L12.7071 9.79289L9.70711 6.79289L8.29289 8.20711ZM11.2929 9.79289L8.29289 12.7929L9.70711 14.2071L12.7071 11.2071L11.2929 9.79289Z"
                      fill="#181818" />
              </svg>
          </a>
      </li>
      `
      }
    }
  }
}
