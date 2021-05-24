import {Button} from "reactstrap"

const HeaderBar = (props) => {
    const switchViews=()=>{
        props.setAdminView(!props.adminView)
    }
    return (
    
    <div>

      {props.adminLogin && <button id="formButton" onClick={()=>switchViews()}>{props.adminView?"Employee":"Admin"} view</button>}
      <button id="formButton" onClick={props.clearToken}>Logout</button>

    </div>
  );
};

export default HeaderBar;
