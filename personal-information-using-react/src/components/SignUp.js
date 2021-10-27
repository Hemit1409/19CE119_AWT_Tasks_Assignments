import React from 'react';
import { Formik,Form } from 'formik';
import { TextField } from './TextField'
import * as Yup from 'yup';

export const SignUp = () =>{
    const validate = Yup.object({
        firstname: Yup.string()
            .max(25,"Must be 25 character of less")
            .required("Required"),
        lastname: Yup.string()
            .max(25,"Must be 25 character of less")
            .required("Required"),
        email: Yup.string()
            .email("Email is Invalid")
            .max(150,"Must be less than or equal to 150 characters")
            .required("Required"),
        contact: Yup.string()
            .max(25,"Must be 25 character of less")
            .required("Required"),
        address: Yup.string()
            .max(200,"Must be 200 or less than 200")
            .required("Required"),
        age: Yup.number()
            .required("Required"),
        clg: Yup.string()
            .max(25,"Must be 25 character of less")
            .required("Required"),
    })
    return(
        <Formik
            initialValues={{
                firstname:'',
                lastname:'',
                email:'',
                contact:'',
                address:'',
                age:'',
                clg:''
            }}
            validationSchema={validate}
        >

            {formik => (
                <div>
                    <h1 className="my-4">Sign Up</h1>
                    {console.log(formik.values)}
                    <Form>
                        <TextField label="First Name" name="firstname" type="text" />
                        <TextField label="Last Name" name="lastname" type="text" />
                        <TextField label="Email" name="email" type="email" />
                        <TextField label="Contact" name="contact" type="text" />
                        <TextField label="Address" name="address" type="textarea" />
                        <TextField label="Age" name="age" type="number" />
                        <TextField label="College" name="clg" type="text" />
                        <button className="btn btn-primary mt-3" type="submit">Submit</button>
                        <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                    </Form>
                </div>
            )}
        </Formik>
    );
}