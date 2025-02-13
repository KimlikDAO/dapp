import mina from "/lib/mina/mina.d";
import "/lib/mina/provider.d";

/**
 * @interface
 * @extends {mina.Provider}
 */
mina.AuroProvider = function () { }

/** @const {boolean} */
mina.AuroProvider.prototype.isAuro;

/** @const {mina.AuroProvider|undefined} */
window.mina;
