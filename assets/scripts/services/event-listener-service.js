import StorageService from './storage-service.js'
import VerboseService from './verbose-service.js'

/**
 * @description
 * Service metoder til at oprette og binde eventlisterens
 * @export
 * @class EventListenerService
 */
export default class EventListenerService {
  static bindOnScroll() {
    window.addEventListener('scroll', this.translatebigTypeMessageSection, false)
  }

  static unbindOnScroll() {
    window.removeEventListener('scroll', this.translatebigTypeMessageSection, false)
  }

  static bindOnClick() {
    const anchors = document.getElementsByTagName('a')
    for (const anchor of anchors) {
      if (anchor.href !== 'javascript:void(0)' && !anchor.hasAttribute('data-no-page-refresh')) {
        anchor.addEventListener('click', this.changeLocationHrefWithTransition, false)
      }
    }
  }

  static translatebigTypeMessageSection(event) {
    let target
    for (const bigTypeMessageSection of StorageService.page.bigTypeMessageSections) {
      if (bigTypeMessageSection.hasActiveScrollEventListener) {
        target = bigTypeMessageSection
        break
      }
    }
    if (!target) {
      return false
    }
    let translateX = target.offsetTop - window.pageYOffset
    if (translateX < 0) {
      target.domElement.style.transform = `translateX(${translateX * 2.5}px)`
    } else {
      target.domElement.style.transform = `translateX(0px)`
    }
  }

  static onClickBurgerOpen(event) {
    const burgerOpenElement = StorageService.domElements.get('burger-open')
    const secondaryNavigation = StorageService.domElements.get('secondary-navigation')
    const body = StorageService.domElements.get('body')
    if (!burgerOpenElement || !secondaryNavigation || !body) {
      return false
    }
    burgerOpenElement.addEventListener('click', () => {
      body.style.setProperty('overflow', 'hidden')
      secondaryNavigation.classList.replace('slide-out-top', 'slide-in-top')
      secondaryNavigation.classList.remove('hidden')
    })
    VerboseService.print('Attached on click event listener [#burger-open]')
  }

  static onClickBurgerClose(event) {
    const burgerCloseElement = StorageService.domElements.get('burger-close')
    const secondaryNavigation = StorageService.domElements.get('secondary-navigation')
    const body = StorageService.domElements.get('body')
    if (!burgerCloseElement || !secondaryNavigation || !body) {
      return false
    }
    burgerCloseElement.addEventListener('click', () => {
      body.style.removeProperty('overflow', 'hidden')
      secondaryNavigation.classList.replace('slide-in-top', 'slide-out-top')
    })
    VerboseService.print('Attached on click event listener [#burger-close]')
  }

  static onClickTop(event) {
    const top = document.querySelector('#top')
    if (!top) {
      return false
    }
    top.addEventListener('click', () => {
      window.scrollTo(0, 0)
    })
    VerboseService.print('Attached on click event listener [#top]')
  }

  static onEndedForceReplayVideos(event) {
    const videos = document.querySelectorAll('video')
    if (videos.length === 0) {
      return false
    }
    for (const video of videos) {
      if (video.hasAttribute('autoplay')) {
        video.addEventListener('ended', () => {
          this.load()
          this.play()
        })
      }
    }
    VerboseService.print('Attached on ended event listener [video]')
  }

  static updateScrollDirection(event) {
    if (StorageService.previousPageYOffset < window.pageYOffset) {
      StorageService.scrollDirection = 'down'
    } else {
      StorageService.scrollDirection = 'up'
    }
    StorageService.previousPageYOffset = window.pageYOffset
  }

  static async hideFadeOverlay(event) {
    const fadeOverlay = StorageService.domElements.get('fade-overlay')
    fadeOverlay.classList.add('fade-out')
    await new Promise((r) => setTimeout(r, 300))
    fadeOverlay.classList.add('hidden')
  }

  static async changeLocationHrefWithTransition(event) {
    event.stopPropagation()
    const targetHref = event.target.href
    if (targetHref) {
      await new Promise(() => {
        const fadeOverlay = StorageService.domElements.get('fade-overlay')
        fadeOverlay.classList.remove('hidden')
        fadeOverlay.classList.add('fade-in')
        window.location.href = targetHref
      })
    }
  }
}
