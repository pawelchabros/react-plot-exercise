import { toBlob } from "html-to-image";
import { FileSaver } from "file-saver";

/**
 * Downloads selected HTML node to PNG file
 * @param  {String} selector        A selector of HTML node
 * @param  {String} name            A name of the downloaded
 * @param  {String} backgroundColor Background color of the downloaded image
 */
const downloadHtmlToPng = (selector, name, backgroundColor = "white") => {
  const element = document.querySelector(selector);
  toBlob(element, { backgroundColor }).then(function (blob) {
    if (window.saveAs) {
      window.saveAs(blob, `${name}.png`);
    } else {
      FileSaver.saveAs(blob, `${name}.png`);
    }
  });
};

export default downloadHtmlToPng;
