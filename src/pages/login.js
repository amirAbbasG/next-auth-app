import { useState } from 'react';

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { HiAtSymbol, HiEyeOff, HiEye } from "react-icons/hi";
import { signIn } from 'next-auth/react'
import { useFormik } from 'formik'

import Layout from '@/components/Layout'
import styles from "@/styles/Form.module.css"
import loginValidate from '@/validators/loginValidate';

const Login = () => {

    const router = useRouter()
    const [showPass, setShowPass] = useState(false)

    const handleLoginGoogle = () => {
        signIn("google", { callbackUrl: "http://localhost:3000" })
    }

    const handleLoginGithub = () => {
        signIn("github", { callbackUrl: "http://localhost:3000" })
    }


    const onSubmit = async (values) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: "/"
            })
            console.log(result);

            if (result.ok) {
                router.push(result.url)
            } else {
                alert(result.error)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit,
        validate: loginValidate
    })

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <section className='w-3/4 col gap-8 mx-auto'>
                {/* tiltle */}
                <div className="title">
                    <h1 className='text-gray-800 text-4xl font-bold mb-3'>Explore</h1>
                    <p className='mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
                </div>

                {/* form */}
                <form className='col gap-4' onSubmit={formik.handleSubmit}>
                    <div>
                        <div className={`${styles.input_group} ${(formik.errors.email && formik.touched.email) ? 'border-rose-600' : ''}`}>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                className={styles.input_text}
                                {...formik.getFieldProps("email")}
                            />
                            <span className='icon flex items-center px-4'>
                                <HiAtSymbol size={20} />
                            </span>
                        </div>
                        {formik.errors.email && formik.touched.email ? <span style={{ color: "red" }} className='text-sm'>{formik.errors.email}</span> : null}
                    </div>

                    <div>
                        <div className={`${styles.input_group} ${(formik.errors.password && formik.touched.password) ? 'border-rose-600' : ''}`}>
                            <input
                                name="password"
                                type={`${showPass ? "text" : "password"}`}
                                placeholder="Password"
                                className={styles.input_text}
                                {...formik.getFieldProps("password")}
                            />
                            <span
                                className='icon flex items-center px-4 cursor-pointer hover:text-indigo-500'
                                onClick={() => setShowPass(!showPass)}
                            >
                                {
                                    showPass ? (
                                        <HiEyeOff size={20} />
                                    ) : (
                                        <HiEye size={20} />
                                    )
                                }
                            </span>
                        </div>
                        {formik.errors.password && formik.touched.password ? <span style={{ color: "red" }} className='text-sm'>{formik.errors.password}</span> : null}
                    </div>

                    {/* login buttons */}
                    <div className="input-button">
                        <button type='submit' className={styles.button}>
                            Login
                        </button>
                    </div>
                    <div className="input-button">
                        <button
                            type='button'
                            className={styles.button_custom}
                            onClick={handleLoginGoogle}
                        >
                            <Image alt='google' src={'/images/google.svg'} width={20} height={20} /> Sign In with Google
                        </button>
                    </div>
                    <div className="input-button">
                        <button
                            type='button'
                            className={styles.button_custom}
                            onClick={handleLoginGithub}
                        >
                            <Image alt='github' src={'/images/github.svg'} width={23} height={23} />  Sign In with Github
                        </button>
                    </div>
                </form>

                {/* bottom */}
                <p className='text-center text-gray-400 '>
                    don't have an account yet? <Link href={'/register'} className='text-blue-700'>Sign Up</Link>
                </p>
            </section>
        </Layout>
    )
}

export default Login