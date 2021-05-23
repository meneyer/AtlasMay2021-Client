const HeaderBar = (props) => {
    const switchViews=()=>{
        props.setAdminView(!props.adminView)
    }
    return (
    
    <div>
      {props.adminLogin && <button onClick={switchViews}>{props.adminView?"Employee":"Admin"} view</button>}
      <button onClick={props.clearToken}>Logout</button>
    </div>
  );
};

export default HeaderBar;
