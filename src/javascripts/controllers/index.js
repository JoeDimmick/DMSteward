export const indexPage = (req, res, next) => {
    res.render('layout', {content: 'index', title: 'DMSteward'})
}

export const aboutPage = (req, res, next) => {
    res.render('layout', {content: 'about', title: 'DMSteward'})
}

export const signInPage = (req, res, next) => {
    res.render('layout', {content: 'signin', title: 'DMSteward'})
}

export const signUpPage = (req, res, next) => {
    res.render('layout', {content: 'signup', title: 'DMSteward'})
}