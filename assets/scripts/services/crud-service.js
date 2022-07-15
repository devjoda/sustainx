import StorageService from './storage-service.js'
import VerboseService from './verbose-service.js'
import HomePage from '../components/pages/home-page.js'
import ServicesPage from '../components/pages/services-page.js'
import WorkPage from '../components/pages/work-page.js'
import AboutPage from '../components/pages/about-page.js'
import PeoplePage from '../components/pages/people-page.js'
import JobsPage from '../components/pages/jobs-page.js'
import ContactPage from '../components/pages/contact-page.js'
import DistilledPage from '../components/pages/distilled-page.js'
import NewsPage from '../components/pages/news-page.js'
import InsightsPage from '../components/pages/insights-page.js'
import JobOpportunitiesPage from '../components/pages/job-opportunities-page.js'
import EmployeesPage from '../components/pages/employees-page.js'
import SustainabilityManagementPage from '../components/pages/sustainability-management-page.js'
import SustainabilityNetworksPage from '../components/pages/sustainability-networks-page.js'
import SustainabilityEducationPage from '../components/pages/sustainability-education-page.js'
import NetworksPage from '../components/pages/networks-page.js'
import CaseStudyPage from '../components/pages/case-study-page.js'
import DefaultPage from '../components/pages/default-page.js'
import Employee from '../components/employee.js'
import JobOpportunity from '../components/job-opportunity.js'
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
    let newPage
    const pathname = this.readPage()
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
        newPage = new AboutPage('about', 'dark-1', 'light-1', 'dark-1')
        break
      case 'people':
        newPage = new PeoplePage('people', 'light-1', 'dark-1', 'dark-1')
        break
      case 'jobs':
        newPage = new JobsPage('jobs', 'dark-1', 'light-1', 'dark-1')
        break
      case 'contact':
        newPage = new ContactPage('contact', 'dark-1', 'light-1', 'light-1')
        break
      case 'distilled':
        newPage = new DistilledPage('distilled', 'dark-1', 'light-1', 'light-1')
        break
      default:
        const locationPathname = location.pathname
        // news
        if (locationPathname.substring(10, 23).localeCompare('news', 'en', { sensitivity: 'base' }) === 0) {
          newPage = new NewsPage('news', 'light-1', 'dark-1', 'dark-1')
          // insights
        } else if (locationPathname.substring(10, 18).localeCompare('insights', 'en', { sensitivity: 'base' }) === 0) {
          newPage = new InsightsPage('insights', 'light-1', 'dark-1', 'dark-1')
        } // job-opportunities
        else if (locationPathname.substring(10, 27).localeCompare('job-opportunities', 'en', { sensitivity: 'base' }) === 0) {
          newPage = new JobOpportunitiesPage('job-opportunities', 'dark-1', 'light-1', 'light-1')
        } // employees
        else if (locationPathname.substring(10, 19).localeCompare('employees', 'en', { sensitivity: 'base' }) === 0) {
          newPage = new EmployeesPage('employees', 'dark-1', 'light-1', 'light-1')
        } // services
        else if (locationPathname.substring(10, 18).localeCompare('services', 'en', { sensitivity: 'base' }) === 0) {
          if (locationPathname.substring(34, 44).localeCompare('management', 'en', { sensitivity: 'base' }) === 0) {
            newPage = new SustainabilityManagementPage('sustainability-management', 'light-1', 'dark-1', 'light-1')
          } else if (locationPathname.substring(34, 42).localeCompare('networks', 'en', { sensitivity: 'base' }) === 0) {
            newPage = new SustainabilityNetworksPage('sustainability-networks', 'dark-1', 'light-1', 'light-1')
          } else if (locationPathname.substring(34, 43).localeCompare('education', 'en', { sensitivity: 'base' }) === 0) {
            newPage = new SustainabilityEducationPage('sustainability-education', 'light-1', 'dark-1', 'dark-1')
          }
        } // networks
        else if (locationPathname.substring(10, 18).localeCompare('networks', 'en', { sensitivity: 'base' }) === 0) {
          newPage = new NetworksPage('networks', 'light-1', 'dark-1', 'dark-1')
        } // case studies
        else if (locationPathname.substring(10, 14).localeCompare('work', 'en', { sensitivity: 'base' }) === 0) {
          if (locationPathname.substring(15, 28).localeCompare('case-study-01', 'en', { sensitivity: 'base' }) === 0) {
            newPage = new CaseStudyPage('case-study-01', 'valencia', 'light-1', 'light-1')
          } else if (locationPathname.substring(15, 28).localeCompare('case-study-02', 'en', { sensitivity: 'base' }) === 0) {
            newPage = new CaseStudyPage('case-study-02', 'matisse', 'light-1', 'light-1')
          } else if (locationPathname.substring(15, 28).localeCompare('case-study-03', 'en', { sensitivity: 'base' }) === 0) {
            newPage = new CaseStudyPage('case-study-03', 'tapestry', 'light-1', 'light-1')
          } else {
            newPage = new CaseStudyPage('case-study-default', 'dark', 'light-1', 'light-1')
          }
        } else {
          newPage = new DefaultPage('default', 'dark-1', 'light-1', 'light-1')
        }
    }
    StorageService.page = newPage
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
    let currentPathname = location.pathname.substring(10, location.pathname.length).replace('.html', '')
    return StorageService.pathnames[currentPathname]
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

  static createJobOpportunity(position, link) {
    const jobOpportunity = new JobOpportunity(position, link)
    StorageService.jobOpportunities.add(jobOpportunity)
  }

  static createAllJobOpportunities() {
    this.createJobOpportunity('Marketing Lead', '/job-opportunities/marketing-lead.html')
    this.createJobOpportunity('Project Manager', '/job-opportunities/project-manager.html')
    this.createJobOpportunity('Student Content Writer', '/job-opportunities/student-content-writer.html')
  }

  static createEmployee(firstName, lastName, featuredImage, workTitle, workField, phone, email, link) {
    const employee = new Employee(firstName, lastName, featuredImage, workTitle, workField, phone, email, link)
    StorageService.employees.add(employee)
  }

  static createAllEmployees() {
    this.createEmployee(
      'Line Amtorp',
      'Poulsen',
      '../assets/images/employees/employee-01-320w.png',
      'Founder & Head of Sustainability',
      ['Administration', 'Sustainability'],
      '+ 45 20 11 68 28',
      'lap@sustainx.dk',
      '/people/line-amtorp-poulsen.html'
    )
    this.createEmployee(
      'Kristian',
      'Danielsen',
      '../assets/images/employees/employee-02-320w.png',
      'Founder & Head of Project Management',
      ['Administration', 'Project Management'],
      '+45 42 17 48 76',
      'kda@sustainx.dk',
      '/people/kristian-danielsen.html'
    )
    this.createEmployee(
      'Adis',
      'Suhonjic',
      '../assets/images/employees/employee-03-320w.png',
      'Chief Operating Officer',
      ['Administration'],
      '+45 26 81 48 00',
      'ads@sustainx.dk',
      '/people/adis-suhonjic.html'
    )
    this.createEmployee(
      'Mie',
      'Skjodt',
      '../assets/images/employees/employee-04-320w.png',
      'Department Manager',
      ['Administration', 'Sustainability', 'SustainX Academy'],
      '+45 21 72 66 67',
      'mss@sustainx.dk',
      '/people/mie-skjodt.html'
    )
    this.createEmployee(
      'Maria',
      'Kravchenko',
      '../assets/images/employees/employee-05-320w.png',
      'Sustainability Consultant, PhD',
      ['Sustainability'],
      '+45 22 25 34 22',
      'mkr@sustainx.dk',
      '/people/maria-kravchenko.html'
    )
    this.createEmployee(
      'Christian',
      'Sparre',
      '../assets/images/employees/employee-06-320w.png',
      'Sustainability Consultant',
      ['Sustainability'],
      '+45 23 88 18 11',
      'cas@sustainx.dk',
      '/people/christian-sparre.html'
    )
    this.createEmployee(
      'Tenna Viid',
      'Jørgensen',
      '../assets/images/employees/employee-07.svg',
      'People & Culture Lead',
      ['Administration'],
      '+45 23 88 18 11',
      'tvj@sustainx.dk',
      '/people/tenna-viid-joergensen.html'
    )
    this.createEmployee(
      'Anne-Sofie',
      'Petersen',
      '../assets/images/employees/employee-08-320w.png',
      'Sustainability Consultant',
      ['Sustainability'],
      '+47 90 01 12 05',
      'asp@sustainx.dk',
      '/people/anna-sofie-petersen.html'
    )
    this.createEmployee(
      'Niels',
      'Jahn',
      '../assets/images/employees/employee-09-320w.png',
      'Sustainability Consultant',
      ['Sustainability'],
      '+45 60 52 42 98',
      'nja@sustainx.dk',
      '/people/niels-jahn.html'
    )
    this.createEmployee(
      'Tobias S.',
      'Foght',
      '../assets/images/employees/employee-10-320w.png',
      'Sustainability Network Coordinator',
      ['Sustainability'],
      '+45 53 70 25 35',
      'tfo@sustainx.dk',
      '/people/tobias-s-foght.html'
    )
    this.createEmployee(
      'Kristoffer',
      'Nielsen',
      '../assets/images/employees/employee-11-320w.png',
      'Sustainability Project Manager',
      ['Project Management', 'Sustainability'],
      '+45 23 88 18 11',
      'krn@sustainx.dk',
      '/people/kristoffer-nielsen.html'
    )
    this.createEmployee(
      'Josefine D.',
      'Berthelsen',
      '../assets/images/employees/employee-12-320w.png',
      'PR & Communications Coordinator',
      ['Administration'],
      '+45 43 28 14 11',
      'jdb@sustainx.dk',
      '/people/josefine-d-berthelsen.html'
    )
    this.createEmployee(
      'Anton',
      'Kvist',
      '../assets/images/employees/employee-13.svg',
      'Technical Project Manager',
      ['Project Management'],
      '+47 90 01 12 05',
      'ank@sustainx.dk',
      '/people/anton-kvist.html'
    )
    this.createEmployee(
      'Arvin',
      'Fard',
      '../assets/images/employees/employee-14.svg',
      'Academy Intern',
      ['SustainX Academy'],
      '+45 60 52 42 98',
      'arf@sustainx.dk',
      '/people/arvin-fard.html'
    )
    this.createEmployee(
      'Jens',
      'Kruse',
      '../assets/images/employees/employee-15.svg',
      'Sustainability Manager & Consultant',
      ['Sustainability'],
      '+45 53 70 25 35',
      'jek@sustainx.dk',
      '/people/jens-kruse.html'
    )
    this.createEmployee(
      'Line L.',
      'Rasmussen',
      '../assets/images/employees/employee-16-320w.png',
      'Sustainability Project Manager',
      ['Sustainability', 'Project Management'],
      '+45 22 29 21 40',
      'llr@sustainx.dk',
      '/people/line-l-rasmussen.html'
    )
    this.createEmployee(
      'Anna',
      'Malinkowska',
      '../assets/images/employees/employee-17-320w.png',
      'Sustainability Consultant',
      ['Sustainability'],
      '+45 31 23 11 07',
      'anm@sustainx.dk',
      '/people/anna-malinkowska.html'
    )
    this.createEmployee(
      'Peter K.',
      'Krogh',
      '../assets/images/employees/employee-18.svg',
      'Sustainability Graduate',
      ['SustainX Academy'],
      '+47 90 01 12 05',
      'pek@sustainx.dk',
      '/people/peter-k-krogh.html'
    )
    this.createEmployee(
      'Amalie',
      'Bastrup-Birk',
      '../assets/images/employees/employee-19-320w.png',
      'Sustainability Manager',
      ['Sustainability'],
      '+45 23 95 15 29',
      'abw@sustainx.dk',
      '/people/amalie-bastrup-birk.html'
    )
    this.createEmployee(
      'Anne-Freja',
      'Amsinck',
      '../assets/images/employees/employee-20-320w.png',
      'Sustainability Manager',
      ['Sustainability'],
      '+45 26 77 74 78',
      'afa@sustainx.dk',
      '/people/anne-freja-amsinck.html'
    )
    this.createEmployee(
      'Georgiana',
      'Apetroaei',
      '../assets/images/employees/employee-21.svg',
      'Sustainability Coordinator',
      ['Sustainability'],
      '+45 22 81 93 21',
      'gea@sustainx.dk',
      '/people/georgiana-apetroaei.html'
    )
    this.createEmployee(
      'Dana',
      'Ansberga',
      '../assets/images/employees/employee-22-320w.png',
      'Technical Project Manager',
      ['Project Management'],
      '+45 52 82 93 41',
      'daa@sustainx.dk',
      '/people/dana-ansberga.html'
    )
    this.createEmployee(
      'Chantal',
      'Beck',
      '../assets/images/employees/employee-23-320w.png',
      'Academy Associate',
      ['SustainX Academy'],
      '+45 51 32 93 41',
      'cbe@sustainx.dk',
      '/people/chantal-beck.html'
    )
    this.createEmployee(
      'Sami',
      'El-Daoud',
      '../assets/images/employees/employee-24-320w.png',
      'Technical Project Manager',
      ['Project Management'],
      '+45 31 31 93 41',
      'swe@sustainx.dk',
      '/people/sami-el-daoud.html'
    )
    this.createEmployee(
      'Maja D.',
      'Pøhler',
      '../assets/images/employees/employee-25-320w.png',
      'Academy Associate',
      ['SustainX Academy'],
      '+45 21 51 41 61',
      'mdp@sustainx.dk',
      '/people/maja-d-poehler.html'
    )
    VerboseService.print('Created employees [25]')
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
}
