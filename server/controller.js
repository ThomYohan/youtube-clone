module.exports = {
    getOne: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_video([id])
            .then((video) => {
                res.status(200).send(video)
            })
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
        const { category, id } = req.params
        db.get_videos_by_category([category, id])
            .then(videos => {
                res.status(200).send(videos)
            })

            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
            })
    },
    upload: (req, res) => {
        const db = req.app.get('db')
        const { url, user_id, category, title, video_desc, thumbnail, strDuration } = req.body
        // console.log(strDuration)
        db.upload_video([url, user_id, category, title, video_desc, thumbnail, strDuration])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getLikes: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_like_count([id])
            .then((like) => res.status(200).send(like))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getDislikes: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_dislike_count([id])
            .then((dislike) => res.status(200).send(dislike))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    like_dislike: async (req, res) => {
        const db = req.app.get('db')
        const { video_id, likeDislike } = req.body
        let video = +video_id
        const { user_id } = req.session.user
        let like = await db.get_likes([video, user_id])
        if (like[0] === undefined) {
            db.create_like([video, user_id, likeDislike])
                .then(() => res.sendStatus(200))
                .catch(err => {
                    res.status(500).send({ errorMessage: "Something went wrong" })
                    console.log(err)
                })
        }
        else if (like[0].liked === likeDislike) {
            db.delete_like([video, user_id]).then(() => res.sendStatus(200))
                .catch(err => {
                    res.status(500).send({ errorMessage: "Something went wrong" })
                    console.log(err)
                })
        }
        else {
            db.update_like([video, user_id, likeDislike])
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
    createComment: (req, res) => {
        const db = req.app.get('db')
        const { video_id, comment, user_id } = req.body
        db.create_comment([video_id, comment, user_id])
            .then((comments) => res.status(200).send(comments))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getComments: (req, res) => {
        const db = req.app.get('db')
        const { video_id } = req.params
        db.get_comments([video_id])
            .then((comments) => res.status(200).send(comments))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    deleteComment: (req, res) => {
        const db = req.app.get('db')
        // console.log(req.params)
        const { comment_id, user_id, video_id } = req.params
        db.delete_comment([comment_id,user_id,video_id]).then(comments=>{
            // console.log(comments)
            res.status(200).send(comments)})
    },
    viewCount: (req, res) => {
        const db = req.app.get('db')
        const { video_id } = req.body

        db.increase_viewcount([video_id])
            .then((view_count) => {
                // console.log(view_count)
                res.status(200).send(view_count)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    getUser: (req, res) => {
        res.status(200).send(req.session.user)
    },
    searchVideos: (req, res) => {
        const db = req.app.get('db')
        let { searchString } = req.body

        const query = `SELECT * FROM video v JOIN user_info u on u.user_id = v.user_id WHERE title ILIKE '%${searchString}%' OR category ILIKE '%${searchString}%' ORDER BY view_count DESC`
        db.query(query)
            .then((videos) => {
                res.status(200).send(videos)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
            })
    },
    getVideosByUser: (req, res, next) => {
        const db = req.app.get('db')
        let { id } = req.params

        db.get_videos_by_user([id])
            .then(videos => {
                res.status(200).send(videos)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
            })
    },
    updateChannel: (req, res, next) => {
        const db = req.app.get('db')
        let { user_id, channelName } = req.body
        // console.log(user_id, channelName)

        db.update_channel([user_id, channelName])
            .then(() => res.sendStatus(200))
            .catch((err) => {
                res.status(500).send({ errorMessage: "Something went wrong" })
            })
    },
    signout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}
