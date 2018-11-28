module.exports = {
    createUser: (req, res) => {
        const userName = req.body.name
        userName = userName.split(' ')
        let firstName = userName[0]
        let lastName = userName[1]
        const dbInstance = req.app.get('db')
        const { email, picture, sub} = req.body
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
    update: (req, res) => {
        const dbInstance = req.app.get('db')
        const { id } = req.params
        const { desc } = req.query
        dbInstance.update_product([id, desc])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
    delete: (req, res) => {
        const dbInstance = req.app.get('db')
        const { id } = req.params
        dbInstance.delete_product([id])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Something went wrong" })
                console.log(err)
            })
    },
}