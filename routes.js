import express from "express";
import mailgen from "mailgen";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
let router = express.Router();

router.post("/get-data", async(req, res)=>{
    try {
        let userData = req.body;
        console.log(userData)
        if(!userData){
            return res.status(400).json({msg:"empty", response:false})
        }
        let username = process.env.adminEmail;
        let password = process.env.adminPass;
        let config = {
            service:"gmail",
            auth:{
                user:username,
                pass:password
            }
        }
        // console.log(username)
        let tranporter = nodemailer.createTransport(config);

        let Mailgen = new mailgen({
            theme:"default",
            product:{
                name:"Support",
                link:"https://my-portfolio-surya.netlify.app"
            }
        })

        let response = {
            body:{
                name:"Surya",
                intro:"Mail from your profile viewer",
                table:{
                    data:[
                        {
                            username:userData.name,
                            userEamil:userData.email,
                            description:userData.msg
                        }
                    ]
                },
                outro:"Thank you"
            }
        }

        let mail = Mailgen.generate(response)
        let sendTo = {
            from:username,
            to:username,
            subject:"User comment",
            html:mail
        }
        tranporter.sendMail(sendTo).then(()=>{
            return res.status(201).json({result:"you will receive an email", response:true})
        }).catch((error)=>{
            return res.status(500).json({err:error, response:false});
        })
        
    } catch (error) {
        return res.status(500).json({msg:"server-error", err:error, response:false});
    }

})
export let userrouter = router;