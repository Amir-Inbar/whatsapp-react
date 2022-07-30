interface ChatLoaderProp {
  children: JSX.Element
  type: string
}

export const ChatLoader = (props: ChatLoaderProp): JSX.Element => {
  const { isSuccess } = props.children.props

  const ChatListLoader = () => {
    return (
      <article className="card-preview flex align-center">
        <div className="card-preview-avatar"></div>
        <div className="card-preview-text flex column space-between">
          <div className="flex space-between">
            {[...Array(2)].map((_, idx) => (
              <p className="card-preview-loader-line" key={idx}></p>
            ))}
          </div>
          <p className="card-preview-loader-line"></p>
        </div>
      </article>
    )
  }

  const MainChatLoader = () => {
    return (
      <section className="startup">
        <svg className="spinner-container" width="65px" height="65px" viewBox="0 0 52 52">
          <circle className="path" cx="26px" cy="26px" r="20px" fill="none" stroke-width="4px" />
        </svg>
      </section>
    )
  }

  return (
    <>
      {isSuccess
        ? { ...props.children }
        : [...Array(6)].map((_, idx) => <section key={idx}>{ChatListLoader()}</section>)}
    </>
  )
}
