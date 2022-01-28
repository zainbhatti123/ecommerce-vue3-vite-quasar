const express = require('express')
const router = express.Router()
const mongoose =require('mongoose')
const Post = mongoose.model("Post") 
const requireLogin = require('../middleware/requireLogin')

router.get('/allpost',(req, res) =>{
    Post.find()
    .populate('postedBy',"_id name")
    .then(posts =>{
        res.json({posts})
    })
    .catch(err =>{
        console.log('error in getAllPost is :', err)
    })
})
router.get('/myPost',requireLogin,(req, res) =>{
    Post.find({postedBy:req.user._id})
    .populate('postedBy',"_id name")
    .then(myPost =>{
        res.json({myPost})
    })
    .catch(err =>{
        console.log('error in getAllPost is :', err)
    })
})

router.post('/createpost',requireLogin, (req , res) =>{
    const {title, body, photo} = req.body
    // console.log('body', req.body)
    if(!title || !body || !photo){
        // console.log('tag',photo)
        return res.status(422).json({error:"please add all fields"})
    }
    req.user.password= undefined
    const post = new Post({
        title,
        body,
        photo,
        postedBy:req.user
    })
    post.save()
    .then(result =>{
        res.json({post:result})
    })
    .catch(err =>{
        console.log('This is post error :', err)
    })
    console.log('This User is :', req.user)
     

})
module.exports= router