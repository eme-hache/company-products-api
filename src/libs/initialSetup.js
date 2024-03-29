import Role from '../models/Role'

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()
    
        if (count > 0) return
    
        const values = await Promise.all([
            new Role({ name: 'admin' }).save(),
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save()
        ])

        console.log('Roles created:', values)
    }
    catch (error) {
        console.log(error)
    }
}