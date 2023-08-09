const { User } = require('../models');
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async function (parent, args, context) {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
        },
        Mutation: {
            addUser: async function (parent, { username, email, password }) {
                const user = await User.create({ username, email, password })
                const token = signToken(user)
                return { token, user }
            },
            login: async (parent, { email, password }) => {
                const user = await User.findOne({ email });

                if (!user) {
                    throw new AuthenticationError('No user with this email found!');
                }

                const correctPw = await user.isCorrectPassword(password);

                if (!correctPw) {
                    throw new AuthenticationError('Incorrect password!');
                }

                const token = signToken(user);
                return { token, user };
            },
            savedBook: async (parent, { book }, context) => {
                if (context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: book } },
                        { new: true, runValidators: true }
                    );
                    return updatedUser;
                }
                throw new AuthenticationError("Login Required!");
            },
            removeBook: async (parent, { bookId }, context) => {
                if (context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedBooks: bookId.bookId } },
                        { new: true }
                    );
                    return updatedUser;
                }
            }
        }
    }
}
module.exports = resolvers