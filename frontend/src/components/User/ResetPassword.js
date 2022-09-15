import React, { Fragment, useEffect , useState } from "react";
import "./ResetPassword.css";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword  } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import Metadata from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";




const ResetPassword = (history,match) => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, loading, success } = useSelector( 
         (state) => state.forgotPassword );

     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");

 
  
   
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
            
      myForm.set("confirmPassword", confirmPassword);

    
      dispatch(resetPassword(match.params.token,myForm));
    };
  
  
    useEffect(() => {
      
      if(error){
          alert.error(error);
          dispatch(clearErrors());
      }
       
      if (success){  
      alert.success("Password Updated Successfully");
      
      
      history.push("/login");
      dispatch({
          type:UPDATE_PASSWORD_RESET,
      });
      }
    }, [dispatch, error, alert, , history, success]);
return (
  <Fragment >
  {loading? <Loader/> :  <Fragment>
 <Metadata title="Reset Password"/>
<div className="resetPasswordContainer">
 <div className="resetPasswordBox">
     <h2 className="resetPasswordHeading">Update Profile</h2>
 <form
             className="resetPasswordForm"
             onSubmit={resetPasswordSubmit}
           >
              
              <div >
                {/* <LockOpenIcon /> */}
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div >
                {/* <LockIcon /> */}
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
    
       
      
             <input type="submit" value="Update" className="resetPasswordBtn" />
           </form>
     </div>
     </div>
     </Fragment>   }
 </Fragment>
   )
}

export default ResetPassword