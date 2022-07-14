/**
 * @description Repræsenterer et Employee-objekt
 * @export
 * @class Employee
 */
export default class Employee {
  /**
   * Opretter en instance af Employee.
   * @param {String} id
   * @memberof Page
   */
  constructor(firstName, lastName, featuredImage, workTitle, workField, phone, email, link) {
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
    this._firstName = firstName || ''
    this._lastName = lastName || ''
    this._featuredImage = featuredImage || ''
    this._workTitle = workTitle || ''
    this._workField = workField || []
    this._phone = phone || ''
    this._email = email || ''
    this._link = link || ''
  }

  get firstName() {
    return this._firstName
  }

  set firstName(x) {
    if (this._firstName !== x) this._firstName = x
  }

  get lastName() {
    return this._lastName
  }

  set lastName(x) {
    if (this._lastName !== x) this._lastName = x
  }

  get featuredImage() {
    return this._featuredImage
  }

  set featuredImage(x) {
    if (this._featuredImage !== x) this._featuredImage = x
  }

  get workTitle() {
    return this._workTitle
  }

  set workTitle(x) {
    if (this._workTitle !== x) this._workTitle = x
  }

  get workField() {
    return this._workField
  }

  set workField(x) {
    if (this._workField !== x) this._workField = x
  }

  get phone() {
    return this._phone
  }

  set phone(x) {
    if (this._phone !== x) this._phone = x
  }

  get email() {
    return this._email
  }

  set email(x) {
    if (this._email !== x) this._email = x
  }

  get link() {
    return this._link
  }

  set link(x) {
    if (this._link !== x) this._link = x
  }
}
