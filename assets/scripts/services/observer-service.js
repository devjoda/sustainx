import CrudService from './crud-service.js'
import StorageService from './storage-service.js'
import EventListenerService from './event-listener-service.js'
import VerboseService from './verbose-service.js'

/**
 * @description
 * Service metoder til at observere target elementer
 * @export
 * @class ObserverService
 */
export default class ObserverService {
  /**
   * @description
   * Generisk observer-metode, som opretter et Observer-objekt gennem Intersecion Observer API'en
   * med henblik på at observere ændringer i skæringspunkten mellem et target element og
   * viewporten. Giver mulighed for at toggle klasser på body, sitelogoet og navigationen
   * @static
   * @param {String} selector
   * Target elementets selector
   * @param {Boolean} strictIntersecting
   * Boolean som bestemmer om callback funktionen kun skal kaldes
   * hvis target elementet krydser med rodelementet
   * @param {Object} root
   * Rodelementet som anvendes af viewporten til at bestemme synligheden af target elementet
   * Sættes som default til browserens viewport hvis objektet er null
   * @param {Number, []} treshold
   * Indikerer hvor stor en procentdel af target elementet, der skal være synligt før observerens
   * callback funktion skal kaldes. Kan enten være Number eller et array af Numbers
   * @param {String} rootMargin
   * Rodelemntets margin, som forstørrer eller formindsker hver side af rodelementets bounding
   * box før skæringspunkterne udregnes
   * @param {Object} bodyClasses
   * Array med to CSS selektorer til body af typen String
   * @param {Object} siteLogoClasses
   * Array med to CSS selektorer til site logo af typen String
   * @param {Object} navigationClasses
   * Array med to CSS selektorer til navigationen af typen String
   * @memberof ObserverService
   */
  static observe(selector, strictIntersecting, root, treshold, rootMargin, bodyClasses, siteLogoClasses, navigationClasses) {
    const callbackFunction = function () {
      ObserverService.toggleClasses(bodyClasses, siteLogoClasses, navigationClasses)
    }
    CrudService.createObserver(selector, callbackFunction, strictIntersecting, root, treshold, rootMargin)
    VerboseService.print(`Created observer [${selector}]`)
  }

  /**
   * @description
   * Toggler klasser på body, sitelogoet og navigationen
   * @static
   * @param {String} selector
   * Selector til domElementet
   * @param {Array} classes
   * Array med to CSS selektorer af typen String
   * @return {Object}
   * @memberof ObserverService
   */
  static toggleClasses(bodyClasses, siteLogoClasses, navigationClasses) {
    ObserverService.toggleClassesHelperMethod('body', bodyClasses)
    ObserverService.toggleClassesHelperMethod('#main-header', siteLogoClasses)
    ObserverService.toggleClassesHelperMethod('#main-navigation', navigationClasses)
  }

  /**
   * @description
   * Hjælpeklasse til toggleClasses-funktionen
   * @static
   * @param {String} selector
   * Selector til domElementet
   * @param {Array} classes
   * Array med to CSS selektorer af typen String
   * @return {Object}
   * @memberof ObserverService
   */
  static toggleClassesHelperMethod(selector, classes) {
    const target = CrudService.createDomElement(selector)
    // jeg bruger optional chaining (?.) til at læse værdien af arrayet
    // uden at skulle tage forbehold for om arrayet er validt
    if (!target || classes?.length !== 2) {
      return false
    }
    // kontrolstruktur som er indsat for at undgå at callback funktionen
    // affyres, når observeren oprettes (default behaviour)
    if (target.classList.contains('prevent-initial-callback')) {
      target.classList.remove('prevent-initial-callback')
      return target
    }
    if (target.classList.contains(classes[0])) {
      target.classList.replace(classes[0], classes[1])
    } else {
      target.classList.remove(classes[1])
      target.classList.add(classes[0])
    }
    return target
  }

  /**
   * @description
   * Observerer hero'en og transformerer site logo'et og desktop-navigationen, hvis den
   * vertikale scroll position er 0.
   * @static
   * @memberof ObserverService
   */
  static observeHero() {
    const callbackFunction = function (entry) {
      const menuItems = document.querySelectorAll('li.menu-item.desktop')
      const siteLogo = StorageService.domElements.get('site-logo')
      if (!siteLogo || !menuItems) {
        return false
      }
      siteLogo.style.setProperty('transition', '200ms ease-out')
      if (entry.isIntersecting) {
        if (window.pageYOffset == 0) {
          siteLogo.className = `transparent`
          for (const menuItem of menuItems) {
            menuItem.classList.replace('slide-out-top', 'slide-in-top')
          }
        }
      } else {
        siteLogo.classList.remove('transparent')
        for (const menuItem of menuItems) {
          menuItem.classList.add('slide-out-top')
        }
      }
      setTimeout(() => {
        // Gendanner transition til 'none' for at få instant hover effekt
        siteLogo.style.setProperty('transition', 'none')
      }, '200')
    }
    CrudService.createObserver('.hero', callbackFunction, false, null, 0, '0px 0px 0px 0px')
    VerboseService.print('Created observer [.hero]')
  }

  static observeBigTypeMessages() {
    const bigTypeMessageSections = StorageService?.page?.bigTypeMessageSections
    if (!bigTypeMessageSections) {
      return false
    }
    for (const target of StorageService.page.bigTypeMessageSections) {
      const domElement = target.domElement
      const selector = `#${domElement.id}`
      const callbackFunction = function (entry) {
        if (entry.isIntersecting) {
          if (!target.hasActiveScrollEventListener) {
            target.offsetTop = window.pageYOffset
            target.hasActiveScrollEventListener = true
            EventListenerService.bindOnScroll()
          }
        } else {
          if (target.hasActiveScrollEventListener) {
            target.hasActiveScrollEventListener = false
            EventListenerService.unbindOnScroll()
          }
        }
      }
      CrudService.createObserver(selector, callbackFunction, false, null, 1, '0px 0px -650px 0px')
      VerboseService.print(`Created observer [${selector}]`)
    }
  }

  static observeFooter() {
    const callbackFunction = function (entry) {
      const siteLogo = document.querySelector('#site-logo-wrapper')
      const burgerOpen = document.querySelector('li#burger-open')
      if (!siteLogo || !burgerOpen) {
        return false
      }
      if (entry.isIntersecting) {
        siteLogo.classList.add('no-accent')
        burgerOpen.classList.add('no-accent')
      } else {
        siteLogo.classList.remove('no-accent')
        burgerOpen.classList.remove('no-accent')
      }
    }
    CrudService.createObserver('#footer', callbackFunction, false, null, 1, '0px 0px -700px 0px')
    VerboseService.print('Created observer [#footer]')
  }
}
