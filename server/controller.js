module.exports = {
    createUser: (req, res) => {
        const userName = req.body.name
        userName = userName.split(' ')
        let firstName = userName[0]
        let lastName = userName[1]
        const dbInstance = req.app.get('db')
        const { email, picture, sub } = req.body
        dbInstance.create_user([firstName, lastName, sub, picture, email, channelName])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errormessage: 'Something went wrong' })
                console.log(err)
            })
    },
    getOne: (req, res) => {
        const dbInstance = req.app.get('db')
        const { id } = req.params
        dbInstance.get_video(id)
            .then((product) => res.status(200).send(product))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getVidoesByViews: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.get_videos_by_views()
            .then(product => res.status(200).send(product))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getVidoesByCategory: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.get_videos_by_category()
            .then(product => res.status(200).send(product))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    upload: (req, res) => {
        const dbInstance = req.app.get('db')
        const { video_url, user_id, category, title, video_desc, thumbnail } = req.body
        dbInstance.upload_video([video_url, category, title, video_desc, thumbnail])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    like_dislike: (req, res) => {
        const dbInstance = req.app.get('db')
        const { id } = req.params
        dbInstance.update_product([id])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    delete: (req, res) => {
        const dbInstance = req.app.get('db')
        const { id } = req.params
        dbInstance.delete_video([id])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    deleteComment: (req,res)=>{
        const dbInstance = req.app.get('db')
        const { comment_id, user_id } = req.params
        dbInstance.delete_comment([id])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
}