import React, { useState } from 'react';
import { Grid, Form, Segment,  Button, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../base/firebase';

const Login = () => {
    let user = {
        email: '',
        password: ''
    }

    let errors = [];

    const [userState, setuserState] = useState(user);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, seterrorState] = useState(errors);

    const handleInput = (event) => {
        let target = event.target;
        setuserState((currentState) => {
            let currentuser = { ...currentState };
            currentuser[target.name] = target.value;
            return currentuser;
        })
    }

    const checkForm = () => {
        if (isFormEmpty()) {
            seterrorState((error) => error.concat({ message: "Please fill in all fields" }));
            return false;
        }
        return true;
    }

    const isFormEmpty = () => {
        return !userState.password.length ||
            !userState.email.length;
    }

    const formaterrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }

    const onSubmit = () => {
        seterrorState(() => []);
        if (checkForm()) {
            setIsLoading(true);
            firebase.auth()
                .signInWithEmailAndPassword(userState.email, userState.password)
                .then(user => {
                    setIsLoading(false);
                    console.log(user);
                })
                .catch(serverError => {
                    setIsLoading(false);
                    seterrorState((error) => error.concat(serverError));
                })
        }
    }


    return <Grid verticalAlign="top" textAlign="center" className="grid-form" >
        <Grid.Column style={{ maxWidth: '500px' }}>
            <img src="Screen-Shot-2019-01-17-at-2.29.34-PM.png" alt="logo" style={{ marginTop: "50px", width: "40%" }}></img>
            <p className="p-refreshed_page__heading">Sign in to Slack</p>
            <br></br>
            <Form onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input
                        name="email"
                        value={userState.email}
                        icon="mail"
                        iconPosition="left"
                        onChange={handleInput}
                        type="email"
                        placeholder="User Email"
                    />
                    <Form.Input
                        name="password"
                        value={userState.password}
                        icon="lock"
                        iconPosition="left"
                        onChange={handleInput}
                        type="password"
                        placeholder="User Password"
                    />
                </Segment>
                <Button disabled={isLoading} loading={isLoading} fluid={true} style={{backgroundColor:"#4a154b", color:"white" ,fontSize:"120%"}}>Sign In with Email</Button>
            </Form>
            {errorState.length > 0 && <Message error>
                <h3>Errors</h3>
                {formaterrors()}
            </Message>
            }
            <Message>
                Not an User? <Link to="/register">Register </Link>
            </Message>
            <Message>
                Forgot Password? <Link to="/forgotPassword">Forgot Password </Link>
            </Message>
        <footer style={{textAlign: "center", marginTop:"190px"}}>Copyright © 2020 Apoorva Sajjanar</footer> 

        </Grid.Column>   
    </Grid>
    
}

export default Login;