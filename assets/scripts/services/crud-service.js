import StorageService from './storage-service.js'
import VerboseService from './verbose-service.js'
import HomePage from '../components/pages/home-page.js'
import ServicesPage from '../components/pages/services-page.js'
import WorkPage from '../components/pages/work-page.js'
import AboutPage from '../components/pages/about-page.js'
import PeoplePage from '../components/pages/people-page.js'
import Employee from '../components/employee.js'
import Swiper from '../vendors/swiper-bundle.min.js'

/**
 * @description
 * Service metoder til at oprette, læse, opdatere og slette objekter.
 * @export
 * @class CrudService
 */
export default class CrudService {
  /**
   * @description
   * Opretter et page objekt med afsæt i den nuværende lokations stinavn.
   * @static
   * @return {Object}
   * @memberof CrudService
   */
  static createPage() {
    const pathname = this.readPage()
    let newPage
    switch (pathname) {
      case 'home':
        newPage = new HomePage('home', 'dark-1', 'light-1', 'light-1')
        break
      case 'services':
        newPage = new ServicesPage('services', 'dark-1', 'light-1', 'light-1')
        break
      case 'work':
        newPage = new WorkPage('work', 'light-1', 'dark-1', 'dark-1')
        break
      case 'about':
        newPage = new AboutPage('about', 'dark-1', 'light-1', 'light-1')
        break
      case 'people':
        newPage = new PeoplePage('people', 'light-1', 'dark-1', 'dark-1')
        break
      default:
        return false
    }
    StorageService.page = newPage
    VerboseService.print(`Page created [${pathname}]`)
    return newPage
  }

  /**
   * @description
   * Formatterer og returnerer den nuværende lokations stinavn, hvis den findes i storage.
   * @static
   * @return {Object}
   * @memberof CrudService
   */
  static readPage() {
    // Få fat i stinavn og formatér det
    let currentPathname = location.pathname.substring(1, location.pathname.length).replace('.html', '')
    // Check om stinavn findes i storage-service
    const page = StorageService.pathnames[currentPathname]
    VerboseService.print(`Found page file path [${page}]`)
    if (page) {
      return page
    }
    return false
  }

  /**
   * @description
   * Opretter et domElement, formaterer selectoren og gemmer elementet i et map i StorageService.
   * @static
   * @param {String} selector
   * @return {Object}
   * @memberof CrudService
   */
  static createDomElement(selector) {
    const foundDomElement = StorageService.domElements.get(selector)
    if (foundDomElement) {
      return foundDomElement
    }
    const domElement = document.querySelector(selector)
    const formattedSelector = selector.replace('#', '').replace('.', '')
    if (domElement) {
      StorageService.domElements.set(formattedSelector, domElement)
      return domElement
    }
    return false
  }

  static createAllDomElements() {
    CrudService.createDomElement('body')
    CrudService.createDomElement('#site-logo')
    CrudService.createDomElement('#burger-open')
    CrudService.createDomElement('#burger-close')
    CrudService.createDomElement('#secondary-navigation')
    CrudService.createDomElement('#main-header')
    CrudService.createDomElement('#main-navigation')
    CrudService.createDomElement('#fade-overlay')
  }

  /**
   * @description
   * Sletter et domElement fra Storage.
   * @static
   * @param {String} selector
   * @return {Boolean}
   * @memberof CrudService
   */
  static deleteDomElement(selector) {
    return StorageService.domElements.delete(selector)
  }

  /**
   * @description
   * Opretter et Observer-objekt gennem Intersecion Observer API'en med henblik på at observere
   * ændringer i skæringspunkten mellem et target element og viewporten
   * @static
   * @param {String} selector
   * Target elementets selector
   * @param {Function object} callbackFunction
   * Callback funktion som kaldes, når target elementet
   * krydser rodelementet i et bestemt øjeblik i transitionen
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
   * @return {Object}
   * @memberof CrudService
   */
  static createObserver(selector, callbackFunction, strictIntersecting, root, treshold, rootMargin) {
    const target = document.querySelector(selector)
    if (!target) {
      return false
    }
    // jeg bruger short circuit evaluation til at sikre default-værdi til strictIntersecting
    const strictIntersectingOption = strictIntersecting || false
    // jeg bruger nullish coalescing operator til at sikre default-værdier til
    // observer options
    const observerOptions = {
      root: root ?? null,
      treshold: treshold ?? 0,
      rootMargin: rootMargin ?? '0px 0px 0px 0px',
    }
    const newObserver = new IntersectionObserver(function (entries, newObserver) {
      entries.forEach((entry) => {
        // hvis min boolean 'strict intersecting mode' er slået til, så
        // afbrydes hele metodekaldet hvis ikke target elementet krydser med
        // rodelementet
        if (strictIntersectingOption && !entry.isIntersecting) {
          return false
        }
        callbackFunction(entry)
      })
    }, observerOptions)
    newObserver.observe(target)
    StorageService.observers.add(newObserver)
    return newObserver
  }

  static createEmployee(firstName, lastName, featuredImage, workTitle, phone, email) {
    const employee = new Employee(firstName, lastName, featuredImage, workTitle, phone, email)
    StorageService.employees.add(employee)
  }

  static createSwiper() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 1.5,
        },
        1024: {
          slidesPerView: 2.5,
        },
      },
    })
    StorageService.swipers.add(swiper)
  }

  static createAllEmployees() {
    const employee1 = this.createEmployee(
      'Line Amtorp',
      'Poulsen',
      '/assets/images/employees/employee-01-320w.png',
      'Founder & Head of Sustainability',
      '+ 45 20 11 68 28',
      'lap@sustainx.dk'
    )
    const employee2 = this.createEmployee(
      'Kristian',
      'Danielsen',
      '/assets/images/employees/employee-02-320w.png',
      'Founder & Head of Project Management',
      '+45 42 17 48 76',
      'kda@sustainx.dk'
    )
    const employee3 = this.createEmployee(
      'Adis',
      'Suhonjic',
      '/assets/images/employees/employee-03-320w.png',
      'Chief Operating Officer',
      '+45 26 81 48 00',
      'ads@sustainx.dk'
    )
    const employee4 = this.createEmployee(
      'Mie',
      'Skjodt',
      '/assets/images/employees/employee-04-320w.png',
      'Department Manager',
      '+45 21 72 66 67',
      'mss@sustainx.dk'
    )
    const employee5 = this.createEmployee(
      'Mara',
      'Kravchenko',
      '/assets/images/employees/employee-05-320w.png',
      'Sustainability Consultant, PhD',
      '+45 22 25 34 22',
      'mkr@sustainx.dk'
    )
    const employee6 = this.createEmployee(
      'Christian',
      'Sparre',
      '/assets/images/employees/employee-06-320w.png',
      'Sustainability Consultant',
      '+45 23 88 18 11',
      'cas@sustainx.dk'
    )
    const employee7 = this.createEmployee(
      'Tenna Viid',
      'Jørgensen',
      '/assets/images/employees/employee-07.svg',
      'People & Culture Lead',
      '+45 23 88 18 11',
      'tvj@sustainx.dk'
    )
    const employee8 = this.createEmployee(
      'Anne-Sofie',
      'Petersen',
      '/assets/images/employees/employee-08-320w.png',
      'Sustainability Consultant',
      '+47 90 01 12 05',
      'asp@sustainx.dk'
    )
    const employee9 = this.createEmployee(
      'Niels',
      'Jahn',
      '/assets/images/employees/employee-09-320w.png',
      'Sustainability Consultant',
      '+45 60 52 42 98',
      'nja@sustainx.dk',
      'nja@sustainx.dk'
    )
    const employee10 = this.createEmployee(
      'Tobias S.',
      'Foght',
      '/assets/images/employees/employee-10-320w.png',
      'Sustainability Consultant',
      '+45 53 70 25 35',
      'tfo@sustainx.dk'
    )
    const employee11 = this.createEmployee(
      'Kristoffer',
      'Nielsen',
      '/assets/images/employees/employee-11-320w.png',
      'Sustainability Project Manager',
      '+45 23 88 18 11',
      'krn@sustainx.dk'
    )
    const employee12 = this.createEmployee(
      'Josefine D.',
      'Berthelsen',
      '/assets/images/employees/employee-12-320w.png',
      'PR & Communications Coordinator',
      '+45 23 88 18 11',
      'jdb@sustainx.dk'
    )
    const employee13 = this.createEmployee(
      'Anton',
      'Kvist',
      '/assets/images/employees/employee-13.svg',
      'Technical Project Manager',
      '+47 90 01 12 05',
      'ank@sustainx.dk'
    )
    const employee14 = this.createEmployee(
      'Arvin',
      'Fard',
      '/assets/images/employees/employee-14.svg',
      'Academy Intern',
      '+45 60 52 42 98',
      'arf@sustainx.dk'
    )
    const employee15 = this.createEmployee(
      'Jens',
      'Kruse',
      '/assets/images/employees/employee-15.svg',
      'Sustainability Manager & Consultant',
      '+45 53 70 25 35',
      'jek@sustainx.dk'
    )
    const employee16 = this.createEmployee(
      'Lile L.',
      'Rasmussen',
      '/assets/images/employees/employee-16-320w.png',
      'Sustainability Project Manager',
      '+45 22 29 21 40',
      'llr@sustainx.dk'
    )
    const employee17 = this.createEmployee(
      'Anna',
      'Malinkowska',
      '/assets/images/employees/employee-17-320w.png',
      'Sustainability Consultant',
      '+45 31 23 11 07',
      'anm@sustainx.dk'
    )
    const employee18 = this.createEmployee(
      'Peter K.',
      'Krogh',
      '/assets/images/employees/employee-18.svg',
      'Sustainability Graduate',
      '+47 90 01 12 05',
      'pek@sustainx.dk'
    )
    const employee19 = this.createEmployee(
      'Amalie',
      'Bastrup-Birk',
      '/assets/images/employees/employee-19-320w.png',
      'Sustainability Manager',
      '+45 23 95 15 29',
      'abw@sustainx.dk'
    )
    const employee20 = this.createEmployee(
      'Anne-Freja',
      'Amsinck',
      '/assets/images/employees/employee-20-320w.png',
      'Sustainability Manager',
      '+45 26 77 74 78',
      'afa@sustainx.dk'
    )
    const employee21 = this.createEmployee(
      'Georgiana',
      'Apetroaei',
      '/assets/images/employees/employee-21.svg',
      'Sustainability Coordinator',
      '',
      'gea@sustainx.dk'
    )
    const employee22 = this.createEmployee(
      'Dana',
      'Ansberga',
      '/assets/images/employees/employee-22-320w.png',
      'Technical Project Manager',
      '+45 52 82 93 41',
      'daa@sustainx.dk'
    )
    const employee23 = this.createEmployee(
      'Chantal',
      'Beck',
      '/assets/images/employees/employee-23-320w.png',
      'Academy Associate',
      '',
      'cbe@sustainx.dk'
    )
    VerboseService.print('Created employees [23]')
  }
}
