import { Router } from 'express'

import users from './users'
import colors from './colors'
import pages from './pages'
import languages from './languages'
import templates from './templates'
import site from './site'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(colors)
router.use(pages)
router.use(languages)
router.use(templates)
router.use(site)

export default router