import { AccountBalance, LibraryAddCheck, LocalShipping } from '@material-ui/icons'
import { Step,Stepper, StepLabel, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import "./CheckoutSteps.css"

const CheckoutSteps = ({activeStep}) => {

    const steps =[{

        label: <Typography>Shipping Details</Typography>,
        icon : <LocalShipping/>,
    },
    {

        label: <Typography>Confirm Order</Typography>,
        icon : <LibraryAddCheck/>,
    },
    {

        label: <Typography>Payment</Typography>,
        icon : <AccountBalance/>,
    },
];
  const stepStyles ={
    boxSizing : "border-box",

  }
  return (
    <Fragment>
        <Stepper alternativeLabel activeStep ={activeStep} style={stepStyles}>
            {steps.map((item,index) =>(
                <Step
                key={index} active={activeStep === index ? true : false}
                completed={activeStep >= index ? true : false}

                >
                    <StepLabel style = {{
                        color: activeStep>=index ? "#fbc490" : "black",
                    }}
                    icon={item.icon}>
                        {item.label}


                    </StepLabel>

                </Step>


            ))}

        </Stepper>

    </Fragment>
   )
}

export default CheckoutSteps