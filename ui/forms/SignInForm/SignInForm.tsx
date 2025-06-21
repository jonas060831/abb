'use client'

import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import TextInput from '../inputs/TextInput/TextInput'
import styles from './SignInForm.module.css'
import Button from '@/ui/Buttons/Button'
import { signInUser } from '@/app/(serverFunctions)/auth'
import { useAuthContext } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'


const SignInForm = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const { setUser } = useAuthContext()

  const router = useRouter()


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    const { name, value }= event.target

    setFormData({...formData, [name]: value})

  }

  const handleSubmit = async (event: FormEvent) => {
    setIsLoading(true)
    event.preventDefault()

    try {
      const res = await signInUser(formData)

      const token = res.token

      const user = JSON.parse(atob(token.split('.')[1]))

      setUser(user,token)

      if(res.token) router.push('/dashboard')
      else router.push('/sign-in?error=Invalid Credentials')
  
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
    
  }
  return (
    <div className={styles.sign_in_form_container}>
        <div className={styles.header}>
            <img
            src='/medias/images/defaults/amara_logo.png'
            alt='Amara Logo'
            className={styles.logo}
            />
            Owner Portal
        </div>

        <form onSubmit={handleSubmit}>

            <TextInput
            label='Email'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
            />

            <TextInput
            label='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            type='password'
            required
            />

            <Button
            value='Sign In'
            type='submit'
            icon='arrow_right'
            isLoading={isLoading}
            />
        </form>
    </div>

  )
}

export default SignInForm