const { User } = require('../models');

const resolvers = {
    Query: {
        user: async function (parent, args) {
            if (args.id) {
                return await User.findById(args.id)
            }
            if (context.user) {
                return await User.findById(context.user.id)
            }
        },
        users: async function () {
            return await User.find()
        },
    },
    Mutation: {
        addUser: async function (parent, args) {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
        }
    }
}

module.exports = resolvers