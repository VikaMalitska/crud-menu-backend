const Router = require('koa-router');
const router = new Router();
const HotDogController = require('./controllers/hotdogControl')

const hotDogController = new HotDogController();

router.post("/hotdog", hotDogController.create);
router.get("/hotdog", hotDogController.readAll);
router.post("/hotdog/change", hotDogController.change);
router.get("/hotdog/delete/:id", hotDogController.delete);
router.get("/", async (ctx) => {
    ctx.body = "Router up"
})
module.exports = router;