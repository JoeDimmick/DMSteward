import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

toast.configure()

export function VHelp({message}){
    return <p className="help">{message}</p>
}

const validationSchema = yup.object({

    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Valid e-mail Required").required("Required"),
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
})

export default function SignUpForm(){

    //validating form with just useFormik
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues :{
            firstName: "",
            lastName:"",
            email: "",
            username:"",
            password: ""
        },
        validationSchema,
        onSubmit(values){
            fetch('/api/users/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }).then((response) => {
                if(!response.ok) throw Error('Failed to register')
                return response.text()
            }).then(() => {
                toast('Successfully registered', {
                    onClose: () =>{
                        document.location = "/monsters"
                    }
                })
            }).catch((error) => {
                toast('Failed to register', {
                    onClose: () => {
                        document.location = "/monsters"
                    }
                })
            })
        }
    })

    const history = useHistory()

    return(
        <form onSubmit = {handleSubmit}>
            <h1>Sign Up</h1>
            <div className = "field">
                <label htmlFor= "firstName">First Name</label>
                <div className="control">
                    <input type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleChange}/>
                    <VHelp message={errors.firstName}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "lastName">Last Name</label>
                <div className="control">
                    <input type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleChange}/>
                    <VHelp message={errors.lastName}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "email">Email</label>
                <div className="control">
                    <textarea type="text" name="email" id="email" value={values.email} onChange={handleChange}/>
                    <VHelp message={errors.email}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "username">Username</label>
                <div className="control">
                    <input type="text" name="username" id="username" value={values.username} onChange={handleChange}/>
                    <VHelp message={errors.username}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "password">Password</label>
                <div className="control">
                    <input type="password" name="password" id="password" value={values.password} onChange={handleChange}/>
                    <VHelp message={errors.password}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= ""></label>
                <div className="control">
                    <button className="primary" type="submit">Submit</button>
                    <button className="primary"onClick={() =>document.location = '/monsters'}>Cancel</button>
                </div>
            </div>
        </form>
    )
}