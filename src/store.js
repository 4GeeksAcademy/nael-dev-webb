import { FcDataEncryption } from "react-icons/fc";

export const initialStore=()=>{
  return{
    phoneBookContact: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_contact':

      const { phoneBookContact,contact } = action.payload;
   
       if (phoneBookContact) {
      
        return {
          ...store,
          phoneBookContact: phoneBookContact
        };
      } else if (contact) {
       
        return {
          ...store,
          phoneBookContact: [
            ...store.phoneBookContact,
            contact
          ]
        };
      }

      return store;

      case 'delete_contact':
        const{id} = action.payload;
        return{
           ...store,
          phoneBookContact: store.phoneBookContact.filter(contact => contact.id !== id)
        };

    default:
      throw Error('Acción desconocida.');
  }    
}