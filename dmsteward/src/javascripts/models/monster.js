import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let monsterSchema = new Schema({
    name: String,
    meta: String,
    Armor_Class: String,
    Hit_Points: String,
    Speed: String,
    STR: String,
    STR_mod: String,
    Dex: String,
    DEX_mod: String,
    CON: String,
    CON_mod: String,
    INT: String,
    INT_mod: String,
    WIS: String,
    WIS_mod: String,
    CHA: String,
    CHA_mod: String,
    Saving_Throws: String,
    Skills: String,
    Senses: String,
    Languages: String,
    Challenge: String,
    Traits: String,
    Actions: String,
    Legendary_Actions: String,
    img_url: String,
    Damage_Immunities: String,
    Condition_Immunities: String,
    Damage_Resistances: String,
    added_by: {type: Schema.Types.ObjectId,  ref: "User"}
});

monsterSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

monsterSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})

export let Monster = mongoose.model("Monster", monsterSchema)