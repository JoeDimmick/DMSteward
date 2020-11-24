require('../favicon.ico')
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)


import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import AddMonster from './components/AddMonster'
import  SignUpForm  from './components/SignUpForm'
import  SignInForm  from './components/SignInForm'
import SignOut from "./components/SignOut";

if(document.getElementById('main')){
    ReactDOM.render(<App/>, document.getElementById('main'))
}else if(document.getElementById('contact')){
    ReactDOM.render(<AddMonster/>, document.getElementById('addmonster'))
}else if(document.getElementById('signup')){
    ReactDOM.render(<SignUpForm/>, document.getElementById('signup'))
}else if(document.getElementById('signin')){
    ReactDOM.render(<SignInForm/>, document.getElementById('signin'))
}

if(document.querySelector('#_sign_user_out')){
    document.querySelector('#_sign_user_out').onclick = (e) => {
        let el = document.createElement('div')
        document.body.appendChild(el)
        ReactDOM.render(<SignOut/>, el)
    }
}