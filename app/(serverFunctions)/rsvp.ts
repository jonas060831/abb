
export const getAllRsvp = async () => {

    try {
        
        const res = await fetch('/api/rsvp')

        const data = await res.json()

        return data

    } catch (error:any) {
        console.log(error)
        return error.message
    }
}

export const addNewRsvp = async (formData:any) => {
    try {
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        }
        const res = await fetch('/api/rsvp', options)

        const data = await res.json()


        return data
    } catch (error:any) {
        console.log(error)

        return error.message
    }
}