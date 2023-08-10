/**
 * @interface
 * @struct
 */
function Bağlantı() { };

/**
 * @param {string} ağ
 * @return {!Promise<void>}
 */
Bağlantı.prototype.ağSeç = function (ağ) { }

/**
 * @param {string} ağ
 * @param {function(string)} ağDeğişti
 * @param {function(!Array<string>)} adresDeğişti
 * @return {!Promise<void>}
 */
Bağlantı.prototype.bağla = function (ağ, ağDeğişti, adresDeğişti) { }

Bağlantı.prototype.kopar = function () { }

/**
 * @return {boolean}
 */
Bağlantı.prototype.varsaKur = function () { }

/**
 * @return {string}
 */
Bağlantı.prototype.indirURLi = function () { }

/**
 * @return {string}
 */
export { Bağlantı };
