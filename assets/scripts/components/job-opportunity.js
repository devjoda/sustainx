/**
 * @description Repræsenterer et JobOpportunity-objekt
 * @export
 * @class JobOpportunity
 */
export default class JobOpportunity {
  constructor(position, link) {
    // guid generation
    Object.defineProperty(this, 'id', {
      // ikke-rfc compliant (...men godt nok til vores scope)
      value: Math.random().toString(36).substring(2, 9),
      // prop skal ikke kunne ændres/slettes
      configurable: false,
      // prop skal ikke kunne ændres med en assignment operator
      writable: false,
      // prop skal ikke dukke op ved enumeration
      enumerable: true,
    })
    this._position = position || ''
    this._link = link || ''
  }

  get position() {
    return this._position
  }

  set position(x) {
    if (this._position !== x) this._position = x
  }

  get link() {
    return this._link
  }

  set link(x) {
    if (this._link !== x) this._link = x
  }
}
