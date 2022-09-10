import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial,SpeedDialAction } from "@material-ui/lab";
import Dashboard from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";

const UserOptions = ({user}) => {
    const[open,setOpen]=useState(false);
    return (<Fragment>
        <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={()=> setOpen(false)}
        onOpen={() => setOpen(true) }
        open={open}
        icon={<img
         className="SpeedDialIcon"
         src={user.avatar.url ? user.avatar.url:"/Profile.png"}
         alt="Profile"
        />}
        >    
        </SpeedDial>
    </Fragment>
    );
};

export default UserOptions;