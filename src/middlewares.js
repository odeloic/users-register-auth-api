import { verifyToken } from './user.utils'
import User from './user.model'

const protectRoute = async (req, res, next) => {
  const bearer = req.headers.authorization
  if (!bearer || !bearer.startsWith('Bearer ')) res.status(404).end({ success: false, message: 'Not Authorized' })
  const [str, token] = bearer.split('Bearer ')
  const { id } = verifyToken(token)
  if (!id) res.status(401).send({ success: false, message: 'Not Authorized' })
  const user = await User.findById(id)
  if (!user) res.status(401).send({ success: false, message: 'Not Authorized' })
  req.user = user
  next()
}


export {
  protectRoute
}
