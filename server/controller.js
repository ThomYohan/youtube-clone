module.exports = {
    getOne: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_video([id])
            .then((video) => res.status(200).send(video))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getVidoesByViews: (req, res) => {
        const db = req.app.get('db')
        db.get_videos_by_views()
            .then(videos => res.status(200).send(videos))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getVidoesByCategory: (req, res) => {
        const db = req.app.get('db')
        const { category } = req.params
        db.get_videos_by_category(category)
            .then(videos => res.status(200).send(videos))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
            })
    },
    upload: (req, res) => {
        const db = req.app.get('db')
        const { url, user_id, category, title, video_desc, thumbnail } = req.body
        db.upload_video([url, user_id, category, title, video_desc, thumbnail])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getLikes: (req, res) => {
        const db = req.app.get('db')
        const { video_id } = req.params
        console.log(req.params)
        db.get_like([video_id])
            .then((like) => res.status(200).send(like))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getDislikes: (req, res) => {
        const db = req.app.get('db')
        const { video_id } = req.params
        console.log(req.params)
        db.get_dislike([video_id])
            .then((dislike) => res.status(200).send(dislike))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    like_dislike: async (req, res) => {
        const db = req.app.get('db')
        const { video_id, likeDislike } = req.body
        const { user_id } = req.sessions.user
        let like = await db.get_likes([video_id, user_id])
        if (like === []) {
            db.create_like([video_id, user_id, likeDislike])
                .then(() => res.sendStatus(200))
                .catch(err => {
                    res.status(500).send({ errorMessage: "Something went wrong" })
                    console.log(err)
                })
        }
        else if (like[0].liked === likeDislike) {
            db.delete_like([video_id, user_id]).then(() => res.sendStatus(200))
                .catch(err => {
                    res.status(500).send({ errorMessage: "Something went wrong" })
                    console.log(err)
                })
        }
        else {
            db.update_like([video_id, user_id, likeDislike])
                .then(() => res.sendStatus(200))
                .catch(err => {
                    res.status(500).send({ errorMessage: "Something went wrong" })
                    console.log(err)
                })
        }
    },
    deleteVideo: (req, res) => {
        const db = req.app.get('db')
        const { video_id } = req.params
        db.delete_video([video_id])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getComments: (req, res) => {
        const db = req.app.get('db')
        const { video_id } = req.params
        console.log(req.params)
        db.get_comments([video_id])
            .then((comments) => res.status(200).send(comments))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    deleteComment: (req, res) => {
        const db = req.app.get('db')
        const { comment_id, user_id } = req.body
        db.delete_comment([id])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    viewCount: (req, res) => {
        const db = req.app.get('db')
        const { video_id } = req.params
        const vc = ''
        db.get_viewcount([video_id])
            .then((res) => {
                if (res.view_count === null) { vc = 1 }
                else { vc = res.view_count++ }
                db.increase_viewcount([id, vc])
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getUser: (req, res) => {
        res.status(200).send(req.session.user).catch(err => {
            res.status(500).send({ errorMessage: "Something went wrong" })
            console.log(err)
        })
    }
}