import {Button} from "reactstrap"

const HeaderBar = (props) => {
    
    return (
    
    <div style={{position:'fixed',top:'0',height:'50px',backgroundColor:"#C5CDF1",width:"100vw",margin:'0 -2%',padding:'10px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3>The Awesome Company</h3>
        <div>
        {props.adminLogin && <button id="formButton" style={{margin:"3px"}} onClick={()=>props.setAdminView(!props.adminView)}>{props.adminView?"Employee":"Admin"} view</button>}
      <button id="formButton" style={{margin:"3px"}} onClick={props.clearToken}>Logout</button>
        </div>
        
      

    </div>
  );
};

export default HeaderBar;
