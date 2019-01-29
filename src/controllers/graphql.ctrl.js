import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLSchema,
  GraphQLInputObjectType
} from 'graphql';

import bcrypt from 'bcrypt';
import models from '../models';

const saltRounds = 10;

const passwordEncryption = (salt, characters) => {
  return bcrypt.hashSync(characters, salt);
}

const Users = new GraphQLObjectType({
  name:'Users',
  description: 'users types',
  fields:() => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'users id',
        resolve(users) { return users.id; }
      },
      firstname: {
        type: GraphQLString,
        resolve(users){ return users.firstname }
      },
      lastname: {
        type: GraphQLString,
        resolve(users){ return users.lastname }
      },
      email: {
        type: GraphQLString,
        description: 'users email',
        resolve(users) { return users.email }
      },
      password: {
        type: GraphQLString,
        resolve(users){ return users.password }
      },
      createdAt: {
        type: GraphQLString,
        resolve(users){ return users.createdAt }
      },
      updatedAt: {
        type: GraphQLString,
        resolve(users){ return users.updatedAt }
      }
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      Users: {
        description: 'Users object',
        type: new GraphQLList(Users),
        args: {
          id: { type: GraphQLInt },
          firstname: { type: GraphQLString },
          lastname: { type: GraphQLString },
          email: { type: GraphQLString },
          createdAt: { type: GraphQLString },
          updatedAt: { type: GraphQLString },
        },
        resolve(root, args) {
          return models.User.findAll({ where:args });
        }
      },
    }
  }
});

const UsersInput = new GraphQLInputObjectType({
  name: 'usersInput',
  fields: () => ({
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type:GraphQLString },
  })
})

const Mutations = new GraphQLObjectType({
  name: 'CreateUsers',
  description: 'mutation create users',
  fields: () => ({
    createUsers: {
      type: Users,
      args: {
        usersField: {
          type: UsersInput
        }
      },
      resolve(root, args) {
        return models.User.build({
            firstname: args.usersField.firstname,
            lastname: args.usersField.lastname,
            email: args.usersField.email,
            password: passwordEncryption(saltRounds, args.usersField.password)
          })
          .save()
          .then((newUsers) => {
            return models.User.findById(newUsers.id);
          })
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation:  Mutations
})

module.exports = Schema;