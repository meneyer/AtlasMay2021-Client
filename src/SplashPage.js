const SplashPage=(props)=>{
    return(
        <div>
            SPLASHY!!!
            <button onClick={()=>props.setShowAuth(true)}>Go to login screen</button>
        </div>
    )
}

export default SplashPage;