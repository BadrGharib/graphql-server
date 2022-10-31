import React ,{useState,useEffect} from 'react';
import { useQuery,useMutation } from '@apollo/client';
import {FaTrash} from 'react-icons/fa'
import {GET_CLIENTS} from './queries/clientsQueries'
import {DELET_CLIENT} from '../mutation/client.mutation'
import Spinner from './Spinner'
export default function Clients() {
   const[seletedId,setSelectedId]=useState('')
   useEffect(()=>{
    seletedId !=='' && deletClient()
   },[seletedId])

   const {loading,data,error}=useQuery(GET_CLIENTS)
   const[deletClient]= useMutation(DELET_CLIENT,{
     variables:{id:seletedId},
    //  refetchQueries:[{query:GET_CLIENTS}]
    update(cache,{data:{deletClient}}){
        debugger;
       const {clients}=cache.readQuery({query:GET_CLIENTS})
       cache.writeQuery({
            query:GET_CLIENTS,
            date:{clients:clients.filter(c=>c.id !== seletedId)}

        })
    }
   })
    if(loading) return <Spinner/>
    if(error)return <p>Someting went wrong </p>
  return (
    <>
    {
        !error && !loading && <div className='w-full max-w-3xl h-1/2 flex justify-center'>
            
            <table className='w-[80%]'>
             <thead>
                <tr className='border-red-300 m-1 border-[1px]'>
                    <th>Name</th>
                    <th>Email</th>
                    <th>phone</th>
                </tr>
             </thead>
             <tbody>
             {
                data.clients.map(client=>{
                    return <tr key={client.id} className='border-b-2'>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.Phone}</td>
                        <td>
                            <button onClick={()=>setSelectedId(client.id)} className='btn btn-danger btn-sm'>
                                <FaTrash/>
                            </button>
                        </td>
                    </tr>
                      
                })
            }
             </tbody>
            </table>
        </div>
    }
    </>
  );
}
