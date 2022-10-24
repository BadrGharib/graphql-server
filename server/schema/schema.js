const {projects,clients}=require('../sampleData')
const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLSchema,GraphQLList}=require('graphql')
//mongoose models
const Client=require('../models/Client');
const Project=require('../models/Project');
//Client Type
const ClientType=new GraphQLObjectType({
    name:'Client',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        phone:{type:GraphQLString}
    })
})

//Project Type
const ProjectType=new GraphQLObjectType({
    name:'Project',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent,args){
                //return clients.find(c=>c.id===parent.clientId)
                return Client.findById(parent.clientId)
            }
        }

    })
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        projects:{
            type:GraphQLList(ProjectType),
            resolve(parent,args){
                //return projects; 
                return Project.find();
            }
        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return projects.find(c=>c.id===args.id)
                return Project.findById(args.id)
            }
        },
        clients:{
            type:GraphQLList(ClientType),
            resolve(parent,args){
                //return clients; 
                return Client.find();
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
             //   return clients.find(c=>c.id===args.id)
             return Client.findById(args.id)
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery
})