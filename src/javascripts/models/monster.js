import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let monsterSchema = new Schema({
    name: String,
    meta: String,
    armor_class: String,
    hit_points: String,
    speed: String,
    str: String,
    str_mod: String,
    dex: String,
    dex_mod: String,
    con: String,
    con_mod: String,
    int: String,
    int_mod: String,
    wis: String,
    wis_mod: String,
    cha: String,
    cha_mod: String,
    saving_throws: String,
    skills: String,
    senses: String,
    languages: String,
    challenge: String,
    traits: String,
    actions: String,
    legendary_Actions: String,
    img_url: String,
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