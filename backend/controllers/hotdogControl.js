const koa = require('koa');
const HotDog = require('../db/model/hotdogDb');

class HotDogController {
    
    async create(ctx) {
        try{
            const request = ctx.request.body;
            if(!request.ingredients || request.ingredients.length === 0){
                ctx.body = {
                    success: false,
                    message: "None ingredients"
                    };
                return;   
            }
            if(!request.name){
                request.name = "SecretHotdog"
            }
            
            const newHotdog = await new HotDog({name: request.name, ingredients:request.ingredients});
            
            const res = await newHotdog.save();
            
            ctx.body = {
                success: true,
                result: res
                };

        }
        catch(err){
            ctx.body = {
                success: false,
                result: err
            };
        }
    }
    async readAll(ctx){
        try{
            const res = await HotDog.find({});
            
            ctx.body = {
                success: true,
                result: res
                };

        }
        catch(err){
            ctx.body = {
                success: false,
                result: err
            };
        }
    }

    async change(ctx) {
            const req = ctx.request.body;
            if(!req.id || !req.ingredients) {
                ctx.body = {
                    success: false,
                    result: "False input"
                };
                return;
            }
            const filter =  { id: req.id };
            const update = { ingredients: req.ingredients };
            const res = await HotDog.findOneAndUpdate(filter, update);
            if(!res){
                ctx.body = {
                    success: false,
                    result: "id not found"
                };
                return;
            }
            
            ctx.body = {
                success: true,
                result: res
            };
        
    }
    async delete (ctx){
        const id = ctx.params.id;
        const res = await HotDog.findOneAndRemove({id:id});
        if(!res){
            ctx.body = {
                success: false,
                result: "id not found"
            };
            return;
        }
        ctx.body = {
            success: true,
            result: res
        };
    }
}

module.exports = HotDogController;