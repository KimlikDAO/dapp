import "worker";

/**
 * @constructor
 * @extends {MessageEvent<*>}
 */
function PowWorkerEvent() { };

/** @const {!ArrayBuffer} */
PowWorkerEvent.prototype.data;
