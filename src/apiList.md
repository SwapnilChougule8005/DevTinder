# DevTinder APIs

## authRouter
- POST /signup 
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PUT /profile/password  // forget password API

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## userRouter
- GET /user/request/received
- GET /user/connections
- GET /user/feed -Gets you the profiles of other users on platform

status : ignored, interested, accepeted, rejected