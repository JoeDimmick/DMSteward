import express from 'express'

import { indexPage, aboutPage, signInPage, signUpPage } from '../controllers/index'
import {allMonstersAPI, createMonsterAPI, oneMonsterAPI, updateMonsterAPI, deleteMonsterAPI} from '../controllers/monsters'
import { registerUserAPI, signUserInAPI } from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars'
let router = express.Router()

function isSignedIn(req){
    try{
        jwt.verify(req.cookies.token, APP_SECRET)
        return true
    }catch(err){
        return false
    }
}

function requireSignedIn(req, res, next){
    if(isSignedIn(req)){
        next()
    }else{
        res.status(401)
        res.end()
    }
}

export function getCurrentUser(req){
    if(req.cookies.token){
        return jwt.decode(req.cookies.token, APP_SECRET)
    }else {
        return null
    }
}

export function configureRoutes(app){
    app.all('*', (req, res, next)=>{
        app.locals.signedIn = isSignedIn(req)
        app.locals.currentUser = getCurrentUser(req)
        next()
    })

    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/signin', signInPage)
    router.get('/signup', signUpPage)

    router.get('/monsters*', indexPage)
    router.get('/register', indexPage)
    router.get('/signin', indexPage)

    // Monsters API Endpoints
    router.get('/api/monsters', allMonstersAPI )
    router.get('/api/monsters/:id', oneMonsterAPI )
    router.post('/api/monsters', requireSignedIn, createMonsterAPI )
    router.put('/api/monsters/:id', requireSignedIn, updateMonsterAPI )
    router.delete('/api/monsters/:id', requireSignedIn, deleteMonsterAPI )

    app.use('/', router)

    // users
    router.post('/api/users/register', registerUserAPI);
    router.post('/api/users/signin', signUserInAPI);
}