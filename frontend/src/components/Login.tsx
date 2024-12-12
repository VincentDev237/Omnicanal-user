import React, { useState } from 'react'
import { NavigateFunction, useNavigate, Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Form ,Row,Col, Button, Card, CardBody, Container} from 'react-bootstrap';
import * as Yup from "Yup"

import AuthService from '../services/auth.service';



const Login: React.FC = () => {
  
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  const initialValues: {
    email: string,
    password: string,
    remember:boolean
  } = {
    email: '',
    password: '',
    remember:false
    
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Ce champ est obligatoire!").email("L'e-mail n'est pas valide"),
    password: Yup.string()
      .min(5, "Au moins 6 caractères")
      .max(24, "Trop long")
      .required("Ce champ est obligatoire!"),
    remember: Yup.bool().required().oneOf([true],"Ce rappelez de moi"),
  })

  
  const handleLogin = (formValue: {email:string,password:string }) => {
    setMessage("")
    setLoading(true)
    //throw new Error();
    const { email, password } = formValue;

    

    AuthService.login(email, password).then(() => {
      navigate("/profile")
      window.location.reload();
    }).catch(error => {
      const resMessage = (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) || error.message || error.toString();

      setLoading(false);
      setMessage(resMessage);
    })
  }
  return (
    <main>
      <Container>


        <section className="section register min-vh-100 d-flex flex-column align-items-center 
        justify-content-center py-4">
          <Container>
            <Row className="justify-content-center">
              <Col lg={4} md={6} className="d-flex flex-column align-items-center justify-content-center">
                
                
                <Card className="mb-3">
                  
                  <CardBody>
                    <div className="pt-2 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Connectez-vous à votre compte</h5>
                      <p className="text-center small">Entrez votre nom d'utilisateur et votre mot de passe pour vous connecter</p>
                    </div>
                    
                    <Formik
                      initialValues={initialValues}
                      validateOnChange={true}
                      validationSchema={LoginSchema}
                      onSubmit={handleLogin}
                    >
                      {({ handleSubmit, handleChange, handleBlur, values, touched, errors
                      }) => (
                        
                        <Form className="row g-3 needs-validation" noValidate onSubmit={(event) => handleSubmit(event)}>
                          <Form.Group as={Col} md="12">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder='example@example.com'
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={touched.email && !errors.email}
                              isInvalid={touched.email && !!errors.email}
                            />
                            {touched.email && errors.email && (
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            )}
                            <Form.Control.Feedback type="valid">
                              E-mail valide
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md="12" controlId='validationFormik01'>
                            <Form.Label>Mot de passe *</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder='password'
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={touched.password && !errors.password}
                              isInvalid={touched.password && !!errors.password}
                            />
                            {touched.password && errors.password && (
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
                            )}
                        
                          </Form.Group>
                          <Form.Group as={Col} md="12">
                            <Form.Check
                              name="remember"
                              label="Souviens-toi de moi"
                              feedback="Agree remember me"
                              value={values.remember}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={touched.remember && !errors.remember}
                              isInvalid={touched.remember && !!errors.remember}
                            />
                            {touched.remember && errors.remember && (
                              <Form.Control.Feedback type="invalid">
                                {errors.remember}
                              </Form.Control.Feedback>
                            )}
                            <Form.Control.Feedback type="valid">
                               Ce rappelez de moi
                            </Form.Control.Feedback>
                          </Form.Group>
    
                          <Button type="submit" disabled={loading}>
                            {loading && (
                              <span className='spinner-boder spinner-border-sm'></span>
                            )}
                            <span>Se connecter</span>
                          </Button>
                          <Col>
                            <p className="small mb-0">Je n'ai pas de compte? 
                              <Link to="/register"> Créer un compte</Link>
                            </p>
                          </Col>
                          {message && (<div className='form-group'>
                            <div className='alert alert-danger' role='alert'>
                              {message}
                            </div>
                          </div>)}
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>
              </Col>
           
            </Row>

          
          </Container>

          
      
        </section>
      </Container>
      
    </main>
  
    
  )
}

export default Login;
