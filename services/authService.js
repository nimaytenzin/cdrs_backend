import database from '../models'

class authService{
    
    static async createUser(data){
        try{
            const result = await database.User.create(data)
            return result
        }catch(err){
            throw err
        }
    }

    static async getUserById(id){
        try{
            const result = await database.User.findOne({
                where:{id:Number(id)}
            })
            console.log('its here')
            return result
        }catch(err){
            console.log(err)
            throw err
        }
    }

    static async getUserByEmail(email){
        try{
            const result = await database.User.findOne({
                where:{email:email}
            })
            return result
        }catch(err){
            throw err
        }
    }

    static async getUserBySelector(selector){
        try{
            const result = await database.User.findOne({
                where:{selector:selector}
            })
            return result
        }catch(err){
            throw err
        }
    }

    static async deleteUser(id){
        try{
            const result = await database.User.findOne({
                where:{id:Number(id)}
            })
            if(result){
                const deleteItem = await database.User.destroy({
                    where:{id:Number(id)}
                })
                return deleteItem 
            }
            return null
        }catch(err){
            throw err
        }
    }

    static async updateUser(id,data){
        try{
            const result = await database.User.findOne({
                where:{id:Number(id)}
            })
            if(result){
                const updateItem = await database.User.upate(data,{
                    where:{id:Number(id)}
                })
                return updateItem
            }
            return null 
        }catch(err){
            throw err
        }
    }
}
export default authService;