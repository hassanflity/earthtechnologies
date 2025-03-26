const HomeLoading = () => {
  return (
    <div className="loading-component home">
      <div className="flex gap-5 dir-col ai-c">
         <div className="circle el"></div>
         <div className="text el w-70 br-3"></div>
      </div>
      <div className="grow-2">
        <div className="title el w-60 br-15"></div>
        <div className="flex gap-5 dir-col mt-10">
          <div className="text el w-100 br-3"></div>
          <div className="text el w-70 br-3"></div>
          <div className="text el w-80 br-3"></div>
          <div className="text el w-60 br-3"></div>
        </div>
      </div>
    </div>
  )
}

export default HomeLoading