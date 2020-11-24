import { Monster } from '../models/monster'
import { User } from '../models/user'
import { getCurrentUser } from '../config/routes'

export const allMonstersAPI = (req, res, next) => {
    Monster.find().exec((err, monsters) => {
        if(err){
            res.json({success: false, message: "Query failed"})
            res.end()
        }else{
            res.write(JSON.stringify(monsters))
            res.end()
        }
    })
}

export const oneMonsterAPI = (req, res, next) => {
    Monster.find({_id: req.params.id}).exec((err, monster) => {
        if(err){
            res.json({success: false, message: "Query failed"})
            res.end()
        }else{
            res.write(JSON.stringify(monster))
            res.end()
        }
    })
}

export const createMonsterAPI = (req, res, next) => {
    let monster = new Monster(req.body)
    monster.added_at = new Date()
    monster.updated_at = new Date()
    monster.added_by = new User(getCurrentUser(req))
    Monster.save(err => {
        if(err){
            res.json({success: false, message: "Monster creation failed"})
            res.end()
        }else{
            res.end()
        }
    })
}

export const updateMonsterAPI = (req, res, next) => {
    Monster.findOne({_id: req.params.id}).exec((err, monster) => {
        if(err){
            res.json({success: false, message: "Unable to update"})
            res.end()
        }else{
            Object.assign(monster, req.body)
            monster.updated_at = new Date()
            monster.save(err => {
                if(err){
                    res.json({success: false, message: "Unable to update monster"})
                    res.end()
                }else{
                    res.end()
                }
            })
        }
    })
}

export const deleteMonsterAPI = (req, res, next) => {
    Monster.findOne({_id: req.params.id}).exec((err, monster) => {
        if(err){
            res.json({success: false, message: "Unable to delete"})
            res.end()
        }else{
            Monster.findByIdAndDelete(req.params.id, err => {
                if(err){
                    res.json({success: false, message: "Unable to delete monster"})
                    res.end()
                }else{
                    res.end()
                }
            })
        }
    })
}