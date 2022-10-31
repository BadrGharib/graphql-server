import {gql} from '@apollo/client'
export const DELET_CLIENT=gql`
mutation deleteClient($id:ID!){
    deleteCLient(id:$id){
        id
        name
        email
        phone
      }
}
`
export const ADD_CLIENT=gql`
mutation addClient($name:String!,$email:String!,$phone:String!){
    addClient(name:$name,email:$email,phone:$phone){
        id
        name
        email
        phone
      }
}
`