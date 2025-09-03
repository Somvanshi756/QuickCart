import { Inngest } from "inngest";
import ConnectDB from "./db";
import User from "@/models/user";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart.next" }); 

// inngest functions to send user data to a database
export const syncUserCreation = inngest.createFunction(
    { 
         id: 'sync-user-from-clerk'
    },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
           _id:id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url

    }
    await ConnectDB()
        await User.create(userData)
}
    )


// inngest functions to update user data in a database
export const syncUserUpdation = inngest.createFunction(
    { 
         id: 'update-user-from-clerk'
    },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await ConnectDB()
        await User.findByIdAndUpdate(id, userData)
    }
)


// inngest functions to delete user data in a database
export const syncUserDeletion = inngest.createFunction(
    { 
         id: 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        const { id } = event.data
        await ConnectDB()
        await User.findByIdAndDelete(id)
    }
)
