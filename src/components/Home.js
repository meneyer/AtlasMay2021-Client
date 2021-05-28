import {useEffect, useState} from "react";
import HeaderBar from './HeaderBar'
import Footer from './Footer'
import AdminIndex from './admin/AdminIndex'
import PollDisplay from './poll/PollDisplay'



const Home = (props)=> {

const [adminView,setAdminView]=useState(false);
    return (
      <div >
        <HeaderBar 
         clearToken={props.clearToken} 
         adminLogin={props.adminLogin} 
         setAdminView={setAdminView} 
         adminView={adminView}/>
 <div style={{height:'50px'}}/>

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
        <Footer/>
      </div>
    );
  
}
export default Home;