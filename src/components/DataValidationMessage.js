const DataValidationMessage = ({ data, message, children }) => {
  return (
    <>{
      data.length === 0 ? <div className="validation-message">{message}</div> : children
    }</>
  )
}

export default DataValidationMessage;
