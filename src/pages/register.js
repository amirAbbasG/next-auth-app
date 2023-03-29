import { useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'

import { HiAtSymbol, HiEyeOff, HiEye, HiOutlineUser } from "react-icons/hi";
import { useFormik } from 'formik'
import { useRouter } from 'next/router';

import Layout from '@/components/Layout'
import styles from "@/styles/Form.module.css"
import registerValidate from '@/validators/registerValidate';

const Register = () => {
    const router = useRouter()
    const [showPass, setShowPass] = useState(false)
    const [showConfPass, setShowConfPass] = useState(false)

    const onSubmit = async (values) => {
        try {
            const result = await fetch("http://localhost:3000/api/auth/register", {
                method: "post",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
            })
            console.log(result);
            router.push("/login")
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confPassword: ""
        },
        onSubmit,
        validate: registerValidate
    })

    // const FormInput = ({ name, placeholder, rightIcon, ...otherProps }) => (
    //     <div>
    //         <div className={`${styles.input_group} ${(formik.errors[name] && formik.touched[name]) ? 'border-rose-600' : ''}`}>
    //             <input
    //                 name={name}
    //                 placeholder={placeholder}
    //                 className={styles.input_text}
    //                 {...otherProps}
    //             />
    //             <span className='icon flex items-center px-4'>
    //                 {rightIcon}
    //             </span>
    //         </div>
    //         {formik.errors[name] && formik.touched[name] ? <span style={{ color: "red" }} className='text-sm'>{formik.errors[name]}</span> : null}
    //     </div>
    // )

    return (
        <Layout>
            <div>
                <Head>
                    <title>Register</title>
                </Head>
                <section className='w-3/4 col gap-8 mx-auto'>
                    {/* tiltle */}
                    <div className="title">
                        <h1 className='text-gray-800 text-4xl font-bold mb-4'>Register</h1>
                        <p className='mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
                    </div>

                    {/* form */}
                    <form className='col gap-4' onSubmit={formik.handleSubmit}>
                        {/* <FormInput
                            type="text"
                            name='username'
                            placeholder='Username'
                            rightIcon={<HiOutlineUser size={20} />}
                        /> */}
                        <div>
                            <div className={`${styles.input_group} ${(formik.errors.username && formik.touched.username) ? 'border-rose-600' : ''}`}>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    className={styles.input_text}
                                    {...formik.getFieldProps("username")}
                                />
                                <span className='icon flex items-center px-4'>
                                    <HiOutlineUser size={20} />
                                </span>
                            </div>
                            {formik.errors.username && formik.touched.username ? <span style={{ color: "red" }} className='text-sm'>{formik.errors.username}</span> : null}
                        </div>

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

                        <div>
                            <div className={`${styles.input_group} ${(formik.errors.confPassword && formik.touched.confPassword) ? 'border-rose-600' : ''}`}>
                                <input
                                    name="confPassword"
                                    type={`${showConfPass ? "text" : "password"}`}
                                    placeholder="Confirm Password"
                                    className={styles.input_text}
                                    {...formik.getFieldProps("confPassword")}
                                />
                                <span
                                    className='icon flex items-center px-4 cursor-pointer hover:text-indigo-500'
                                    onClick={() => setShowConfPass(!showConfPass)}
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
                            {formik.errors.confPassword && formik.touched.confPassword ? <span style={{ color: "red" }} className='text-sm'>{formik.errors.confPassword}</span> : null}
                        </div>


                        {/* register button */}
                        <div className="input-button">
                            <button type='submit' className={styles.button}>
                                Register
                            </button>
                        </div>

                    </form>

                    {/* bottom */}
                    <p className='text-center text-gray-400 '>
                        have an account? <Link href={'/login'} className='text-blue-700'>Sign In</Link>
                    </p>
                </section>
            </div>
        </Layout>
    )
}

export default Register