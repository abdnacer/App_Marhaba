const router = require('express').Router()

const verifyrole = require('../middelware/verifyrole')

router.get('/livreur/me', verifyrole.verifyRoleLivreur)
router.get('/manager/me', verifyrole.verifyRoleManager)
router.get('/client/me', verifyrole.verifyRoleClient)

module.exports = router