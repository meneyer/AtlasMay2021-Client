import {Button} from "reactstrap"

const HeaderBar = (props) => {
    const switchViews=()=>{
        props.setAdminView(!props.adminView)
    }
    return (
    
    <div>
      {props.adminLogin && <Button id="formButton" onClick={switchViews}>{props.adminView?"Employee":"Admin"} view</Button>}
      <Button id="formButton" onClick={props.clearToken}>Logout</Button>
    </div>
  );
};

export default HeaderBar;
