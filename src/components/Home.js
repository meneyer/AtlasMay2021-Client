import {useEffect, useState} from "react";
import HeaderBar from './HeaderBar'
import AdminIndex from './admin/AdminIndex'
import PollDisplay from './poll/PollDisplay'



const Home = (props)=> {
    const [adminView,setAdminView]=useState(false)
    // useEffect(()=>{
    //   console.log(props.adminLogin);
    //   setAdminView(props.adminLogin);
    //   console.log(adminView)
    // },[]
    // )

    return (
      <div>
       
        {props.adminLogin?<p>Admin is logged in</p>:<p>Exmployee is logged in</p>}
        <HeaderBar 
          clearToken={props.clearToken} 
          adminLogin={props.adminLogin} 
          setAdminView={setAdminView} 
          adminView={adminView}/>
        {adminView?
          <AdminIndex 
            sessionToken={props.sessionToken}
          />
          :
          <PollDisplay 
          user={props.user} 
          sessionToken={props.sessionToken}
          />
        }
      </div>
    );
  
}
export default Home;