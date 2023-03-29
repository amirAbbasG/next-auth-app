import { hash } from 'bcryptjs'

import connectMongo from '@/database/conn';
import User from "@/models/User"


export default async function handler(req, res) {

    if (req.method === "POST") {
        await connectMongo()
        try {
            if (!req.body) {
                res.status(400).json({ error: "invalid body data" })
            }
            const { username, email, password } = req.body

            const isExist = await User.findOne({ email })

            if (isExist) {
                res.status(422).json({ error: "email exist already" })
            }

            User.create({ username, email, password: await hash(password, 12) }, function (error, data) {
                if (error) {
                    res.status(500).json({ error })
                }
                res.status(201).json({ status: true, user: data })
            })
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(500).json({ error: "http method not valid" })
    }
}