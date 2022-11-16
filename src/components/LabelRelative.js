import Label from "./Label";

/**
 *
 * @param {Number} xPercent Number from [0, 1] indicating at what x position to put the label
 * @param {Number} yPercent Number from [0, 1] indicating at what y position to put the label
 * @param {Object} panelSize Size `{ width, height }` of panel containing the plot
 * @returns
 */
const LabelRelative = ({
  xPercent = 0,
  yPercent = 0,
  panelSize,
  text,
  padding = 3,
  rectClass = "label-background",
  textClass = "label-text",
  nudge = { x: 0, y: 0 },
}) => {
  return (
    <Label
      x={panelSize.width * xPercent}
      y={panelSize.height * yPercent}
      text={text}
      padding={padding}
      rectClass={rectClass}
      textClass={textClass}
      nudge={nudge}
    />
  );
};

LabelRelative.noClip = true;

export default LabelRelative;
