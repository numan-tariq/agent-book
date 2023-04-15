// Sign Up User
/**
 * @api {post} http://localhost:3000/api/user/sign-up Sign-Up User
 * @apiGroup User
 * @apiVersion 0.0.1
 *
 * @apiParamExample {json} Example Body:
 * {
   "email": "john@email.com",
   "firstName": "TEST",
   "lastName": "123",
   "password": "**********",
   "confirmPassword": "**********",
 * }
 *
 * @apiBody {STRING} email Email of the user.
 * @apiBody {STRING} firstName First Name of the user.
 * @apiBody {STRING} lastName Last Name of the user.
 * @apiBody {STRING} password Password of the user.
 * @apiBody {STRING} confirmPassword Confirm Password of the user.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
   "success": true,
   "message": "User has created Successfully!"
 * }
 */

// Sign In User
/**
* @api {post} http://localhost:3000/api/user/sign-in Sign-In User
* @apiGroup User
* @apiVersion 0.0.1
* 
* @apiParamExample {json} Example Body:
* {
    "email": "john@email.com",
    "password": "**********"
* }
* 
* @apiBody {STRING} email Email of the user.
* @apiBody {STRING} password Password of the user. 
* 
* @apiSuccessExample {json} Success-Response:
* { 
    "code": 200,
    "token": "TOKEN FOR LOGGED IN USER",
    "user": {
        "id": "ID OF USER",
        "firstName": "First Name of USER",
        "lastName": "Last Name of USER",
        "email": "Email of USER"
    }
* }
*/

// Request Forgot Password
/**
* @api {post} http://localhost:3000/api/user/req-forgot-password Request Forgot Password
* @apiGroup User
* @apiDescription We can send reset password link to the user email, when the user click on the link the frontend page should be open
 * like change your password, or enter new password.
 * Meanwhile we also need to send a request for verifying token, is this link expired? is this link already used?
* @apiVersion 0.0.1
* 
* @apiParamExample {json} Example Body:
* {
    "email": "john@email.com"
* }
* 
* @apiBody {STRING} email Email of the user.
* 
* @apiSuccessExample {json} Success-Response:
* { 
    "code": 200,
    "message": "Success!",
    "link": "This link will redirect to Fronted where the user will enter new password"
* }
*/

// Verify Token
/**
* @api {post} http://localhost:3000/api/user/verify-token Verify Token
* @apiGroup User
* @apiDescription * If the token is invalid or has expired, a UnauthorizedError with an error message of "Invalid / Expired Token" is thrown.
* @apiVersion 0.0.1
* 
* @apiParamExample {json} Example Body:
* {
    "id": "d3ce999d-73fa-4464-a4fc-cf0477b3beac",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkM2NlOTk5ZC03M2ZhLTQ0NjQtYTRmYy1jZjA0NzdiM2JlYWMiLCJpYXsalkdnlQiOjE2ODE0MzMzMzgsImV4cCI6MTY4MTUxOTczOH0.5H77746uYZs1DvpiS6M8TQeGGM8g6kL5x_GTilUaglY"
* }
* 
* @apiBody {UUID} id Id of the user.
* @apiBody {string} token Token to verify is valid or invalid.
* 
* @apiSuccessExample {json} Success-Response:
* { 
    "code": 200,
    "message": "Success!"
* }
*/

// Set Forgot Password
/**
* @api {post} http://localhost:3000/api/user/set-forgot-password Set Forgot Password
* @apiGroup User
* @apiDescription The function first uses the verify method of the jsonwebtoken package to decode the token using the process.env.TOKEN_SECRET environment variable. If the token is invalid or has expired, a UnauthorizedError with an error message of "Invalid token. Try requesting a new password reset." is thrown.
 * If the token is valid, the function then uses the update method of the Users model to update the user's password and set resetPasswordToken to null.
 * The update query also checks that the userId and token match to ensure that only the correct user is updating their password.
* @apiVersion 0.0.1
* 
* @apiParamExample {json} Example Body:
* {
    "id": "d3ce999d-73fa-4464-a4fc-cf0477b3beac",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkM2NlOTk5ZC03M2ZhLTQ0NjQtYTRmYy1jZjA0NzdiM2JlYWMiLCJpYXsalkdnlQiOjE2ODE0MzMzMzgsImV4cCI6MTY4MTUxOTczOH0.5H77746uYZs1DvpiS6M8TQeGGM8g6kL5x_GTilUaglY"
    "password": "**********",
    "confirmPassword": "**********"
* }
* 
* @apiBody {UUID} id Id of the user.
* @apiBody {string} token Token to verify is valid or invalid.
* @apiBody {string} password New Password of the user.
* @apiBody {string} confirmPassword New Confirm Password of the user
* 
* @apiSuccessExample {json} Success-Response:
* { 
    "code": 200,
    "message": "Success!"
* }
*/

/**
* @api {get} http://localhost:3000/api/card Get All Cards
* @apiGroup Card
* @apiDescription Function that retrieves a list of cards. It accepts an optional filters object as a parameter, which can contain a status field to filter the cards by their status.
* @apiVersion 0.0.1
*
* @apiQuery {string} [status] Status of the card is the filter for fetching cards, Status can be: "backlog", "to_do", "in_process", "in_review", "completed"
* @apiQuery {uuid} [project_id] If project_id present in query, then the API will return card against a Project, otherwise it will return all cards of all projects
* 
* @apiHeader (Header) {String} authorization Authorization Bearer Token.
* 
* @apiSuccessExample {json} Success-Response:
* { 
    "count": 3,
    "rows": [
        {
            "id": "3467a2f6-5fdb-48b3-951e-7869b5b18d57",
            "title": "Agent Book Task",
            "description": null,
            "status": "backlog",
            "project_id": "153c4562-a4b0-4eb9-9fab-8b17e6f8fb12",
            "createdAt": "2023-04-13T19:41:37.220Z"
        },
        {
            "id": "22f5fae6-3030-4076-903c-28b5bbb17211",
            "title": "Agent Book Task",
            "description": null,
            "status": "backlog",
            "project_id": "153c4562-a4b0-4eb9-9fab-8b17e6f8fb12",
            "createdAt": "2023-04-13T19:46:13.096Z"
        },
        {
            "id": "f1759d60-bd96-4ee7-91a9-24ffc48e2d77",
            "title": "Agent Book Task",
            "description": null,
            "status": "backlog",
            "project_id": "153c4562-a4b0-4eb9-9fab-8b17e6f8fb12",
            "createdAt": "2023-04-13T19:53:07.188Z"
        }
    ]
* }
*/

// Add Card
/**
* @api {post} http://localhost:3000/api/card Add Card
* @apiGroup Card
* @apiDescription This API will add a card against project with the help of project_id in body
* @apiVersion 0.0.1
* 
* @apiParamExample {json} Example Body:
* {
    "title": "Agent Book Task",
    "status": "backlog",
    "project_id": "153c4562-a4b0-4eb9-9fab-8b17e6f8fb22"
* }
* 
* @apiBody {string} title Title of the card.
* @apiBody {string} status Status of the card. Status can be: "backlog", "to_do", "in_process", "in_review", "completed"
* @apiBody {uuid} project_id Id of the project
*
* @apiHeader (Header) {String} authorization Authorization Bearer Token.
* 
* @apiSuccessExample {json} Success-Response:
* { 
    "id": "a509da4e-a66d-4e63-af64-360199530d12",
    "title": "Agent Book Task",
    "status": "backlog",
    "project_id": "153c4562-a4b0-4eb9-9fab-8b17e6f8fb12",
    "updatedAt": "2023-04-15T01:10:41.363Z",
    "createdAt": "2023-04-15T01:10:41.363Z",
    "description": null
* }
*/

/**
* @api {get} http://localhost:3000/api/project Get All Projects
* @apiGroup Project
* @apiDescription Function that retrieves a list of projects.
* @apiVersion 0.0.1
* @apiHeader (Header) {String} authorization Authorization Bearer Token.
* 
* @apiSuccessExample {json} Success-Response:
* { 
    "count": 4,
    "rows": [
        {
            "id": "153c4562-a4b0-4eb9-9fab-8b17e6f8fb12",
            "name": "General",
            "description": "This is general Project"
        },
        {
            "id": "953c4562-a4b0-4eb9-9fab-8b17e6f8fb11",
            "name": "Design",
            "description": "This is design Project"
        },
        {
            "id": "653c4562-a4b0-4eb9-9fab-8b17e6f8fb19",
            "name": "Development",
            "description": "This is development Project"
        },
        {
            "id": "253c4562-a4b0-4eb9-9fab-8b17e6f8fb10",
            "name": "Marketing",
            "description": "This is marketing Project"
        }
    ]
* }
*/