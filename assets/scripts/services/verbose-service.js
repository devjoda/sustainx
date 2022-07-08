import StorageService from './storage-service.js'

/**
 * @description
 * Service metoder til at logge verbose beskeder til konsollen
 * @export
 * @class VerboseService
 */
export default class VerboseService {
  /**
   * @description
   * Logger verbose beskeder hvis verbose boolean i storage-service er truthy
   * @static
   * @param {String} message
   * @param {String} backgroundColor - hex value
   * @param {String} color - hex value
   * @memberof VerboseService
   */
  static print(message) {
    if (StorageService.verbose) {
      console.log(`%c ${message} `, `background: #29FE85; color: #181818`)
    }
  }
}
