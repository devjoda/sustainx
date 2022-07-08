/**
 * @description Repræsenterer et BigTypeMessageSection-objekt
 * @export
 * @class BigTypeMessageSection
 */
export default class BigTypeMessageSection {
  /**
   * Opretter en instance af BigTypeMessageSection.
   * @param {String} id
   * @memberof Page
   */
  constructor(domElement) {
    this._domElement = domElement
    this._offsetTop = 0
    this._hasActiveScrollEventListener = false
  }

  get domElement() {
    return this._domElement
  }

  set domElement(x) {
    if (this._domElement !== x) this._domElement = x
  }

  get offsetTop() {
    return this._offsetTop
  }

  set offsetTop(x) {
    if (this._offsetTop !== x) this._offsetTop = x
  }

  get hasActiveScrollEventListener() {
    return this._hasActiveScrollEventListener
  }

  set hasActiveScrollEventListener(x) {
    if (this._hasActiveScrollEventListener !== x) this._hasActiveScrollEventListener = x
  }
}
