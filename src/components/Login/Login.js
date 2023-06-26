import React, { useState , useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer= (state,action)=> {
  if(action.type==="EMAIL_CHANGED"){
    return {...state,value: action.value  }
  }
  if(action.type==="ON_BLUR0"){
    return {...state,isValid: action.isValid  }
  }
  return state;
}
const passReducer= (state,action)=> {
  if(action.type==="PASS_CHANGED"){
    return {...state,value: action.value  }
  }
  if(action.type==="ON_BLUR1"){
    return {...state,isValid: action.isValid  }
  }
  return state;
}
const colgReducer= (state,action)=> {
  if(action.type==="COLG_CHANGED"){
    return {...state,value: action.value  }
  }
  if(action.type==="ON_BLUR2"){
    return {...state,isValid: action.isValid  }
  }
  return state;
}

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
// left with deboucing return clean function pending
//  useEffect(()=>{
//       setFormIsValid(  enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length>0
//       )
//  },[enteredEmail,enteredCollege,enteredPassword])

  const [emailState, dispatchEmail] = useReducer(emailReducer,{value:'',isValid:null})
  const [passState, dispatchPass] = useReducer(passReducer,{value:'',isValid:null})
  const [colgState, dispatchColg] = useReducer(colgReducer,{value:'',isValid:null})

  const emailChangeHandler = (event) => {
   // setEnteredEmail(event.target.value);
         dispatchEmail({type: "EMAIL_CHANGED",value: event.target.value});
         setFormIsValid(  event.target.value.includes('@') && passState.isValid && colgState.isValid);
        };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPass({type: "PASS_CHANGED",value: event.target.value});
    console.log( emailState.isValid , passState.isValid ,colgState.isValid)
    console.log(passState.value)
    
    setFormIsValid(  emailState.isValid && event.target.value.trim().length>6 && colgState.isValid);
  
  };

  const collegeChangeHandler = (event) => {
    //setEnteredCollege(event.target.value);
    dispatchColg({type: "COLG_CHANGED",value: event.target.value});
    
    setFormIsValid(  emailState.isValid && passState.isValid && event.target.value.trim().length>0 );
  };

  const validateEmailHandler = () => {
  //  setEmailIsValid(enteredEmail.includes('@'));
  dispatchEmail({type: "ON_BLUR0",isValid: emailState.value.includes('@')});  
};

  const validatePasswordHandler = () => {
   // setPasswordIsValid(enteredPassword.trim().length > 6);
   dispatchPass({type: "ON_BLUR1",isValid: passState.value.trim().length>6});
  };

  const validateCollegeHandler = () => {
    //setCollegeIsValid(enteredCollege.trim().length>0);
    dispatchColg({type: "ON_BLUR2",isValid: colgState.value.trim().length>0});
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value,colgState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            colgState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={colgState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
