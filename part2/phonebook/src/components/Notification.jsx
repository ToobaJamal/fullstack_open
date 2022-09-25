const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={`${message ? "notification" : ""}`}>
        {message}
      </div>
    )
  }

  export default Notification