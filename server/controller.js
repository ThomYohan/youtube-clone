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
        dbInstance.get_video([id])
            .then((product) => {
                console.log(product)
                res.status(200).send(product)})
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
        const { url, user_id, category, title, video_desc, thumbnail } = req.body
        dbInstance.upload_video([ url, user_id, category, title, video_desc, thumbnail ])
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
    deleteComment: (req, res) => {
        const dbInstance = req.app.get('db')
        const { comment_id, user_id } = req.params
        dbInstance.delete_comment([id])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    viewCount: (req,res)=>{
        const dbInstance = req.app.get('db')
        const { id } = req.params
        const vc = ''
        dbInstance.get_viewcount([id])
            .then((res) => {
                if(res.view_count === null){vc = 1}
                else {vc = res.view_count++}
                dbInstance.increase_viewcount([id,vc])
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    }
}