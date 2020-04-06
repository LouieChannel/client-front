import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row } from '../../components/MaterialProxy';
import './login.scss';

function Login() {
    const { register, handleSubmit, errors } = useForm(); // initialise the hook
    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className="bg-photo">
            <Container>
                <Row>
                    <div className="container-form">
                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <input
                                    placeholder="Username"
                                    className="input-field col s12"
                                    name="username"
                                    ref={register({ required: true })}
                                />

                                {errors.username && (
                                    <span
                                        className="helper-text"
                                        data-error="wrong"
                                        data-success="right"
                                    >
                                        Last name is required.
                                    </span>
                                )}
                            </Row>

                            <Row>
                                <input
                                    placeholder="Password"
                                    className="input-field col s12"
                                    type="password"
                                    name="password"
                                    ref={register({ required: true })}
                                />
                                {errors.password && 'Last name is required.'}
                            </Row>
                            <Row>
                                <input className="btn" type="submit" value="Войти"/>
                            </Row>
                        </form>
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
