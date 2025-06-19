
type SignInProps = {
    username: string;
    password: string
}
export const signInUser = async (formData: SignInProps) => {

    try {
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        }

        const res = await fetch('/api/auth/sign-in', options)

        const data = await res.json()

        return data

    } catch (error) {
        console.error(error);
        return { success: false, error: (error as Error).message };
    }

}