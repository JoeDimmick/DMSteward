import React from 'react'
import { useFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

export function About(){
    return (
        <>
            <h1>About this lis</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </>
    )
}

export function ErrorNotFound(){
    return(
        <div>
            <h1>Page not found</h1>
        </div>
    )
}

export function SignupForm (){
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName:'',
            email: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },

    });

    return (
        <div className="emailform">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor ="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}
                <label htmlFor ="lastName">Last Name</label>
                <input id="lastName" type="text" {...formik.getFieldProps('lastName')} />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                ) : null}
                <label htmlFor ="email">Email Address</label>
                <input id="email" type="email" {...formik.getFieldProps('email')}/>
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <button className="primary" type="submit">Submit</button>
            </form>
        </div>
    );
};