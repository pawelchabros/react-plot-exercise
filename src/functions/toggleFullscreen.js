/**
 * Attach fullscreen listener to selected element
 * Useful when it's required in Shiny server to know when element has entered fullscreen
 * @param  {String} selector A selector of an element to which attach the listener
 * @param  {String} input    A name of Shiny input to send value to
 * @param  {Number} delay    Delay in milliseconds
 */
export function attachFullscreenListener(selector, input, delay) {
  const el = document.querySelector(selector);
  el.addEventListener("fullscreenchange", (e) =>
    fullscreenChanged(input, delay)
  );
}

/**
 * Sets true to given input when fullscreen mode has been entered
 * sets false on exit
 * @param  {String} input A name of Shiny input to send value to
 */
function fullscreenChanged(input, delay = 0) {
  if (document.fullscreenElement) {
    setDelayedInput(input, true, delay);
  } else {
    setDelayedInput(input, false, delay);
  }
}

/**
 * Sets shiny input value after a delay
 * @param  {String} input A name of Shiny input to send value to
 * @param  {Any}    value The value of input
 * @param  {Number} delay Delay in milliseconds
 */
function setDelayedInput(input, value, delay) {
  if (Shiny.setInputValue !== undefined) {
    setTimeout(
      () => Shiny.setInputValue(input, value, { priority: "event" }),
      delay
    );
  }
}

export function toggleFullscreen(selector) {
  let elem = document.querySelector(selector);
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}
