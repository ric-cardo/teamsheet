import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors')({origin: true});
const addCors = fn => (req,res) => cors(req,res,() =>fn(req,res));

export const join = functions.https.onRequest(addCors(onJoin));

async function onJoin(request, response){
    try{
        const {code, uid} = request.body;
        if(!code){
            throw new RequestParamNotFoundError('Code is required')
        }

        if(!uid){
            throw new RequestParamNotFoundError('User must is required')
        }

        const team = await getTeam(code);
        await checkAlreadyInTeam(uid,team);
        await addUser(uid,team);
        response.send({status:'success'})
    }
    catch(error){
        onJoinFail(error,response)
    }
}

async function getTeam(code){
    const team = await admin.database()
        .ref(`/join/${code}`)
        .once('value')
        .then(snap => snap.val());
        
    if(!team){
        throw new TeamNotFoundError(`Invalid join code`)
    }

    return team;
}

function onJoinFail(error,res){
    let code = 500;

    if(
        error instanceof AlreadyOnTeamError || 
        error instanceof TeamNotFoundError ||
        error instanceof RequestParamNotFoundError
    ){
       code = 422;
    }

    return res.status(code).send({error:error.toString()})
}

async function checkAlreadyInTeam(uid,team){

   return admin.database()
    .ref(`/users/${uid}/teams/${team.id}`)
    .once('value')
    .then(snap =>{
        if (snap.exists()){
            throw new AlreadyOnTeamError(`You have already joined ${team.name}`)
        }
        else{
          return team;
        }
    })
}

function addUser(uid,team){
    return admin
        .database()
        .ref(`/users/${uid}/teams/${team.id}`)
        .set(team)
}

class BaseError extends Error{
    constructor(...args) {
        super(...args)
    }

    toString(){
        return {
            message:this.message
        }
    }
}

class AlreadyOnTeamError extends BaseError{
    constructor(...args) {
        super(...args)
    }
}

class TeamNotFoundError extends BaseError{
    constructor(...args) {
        super(...args)
    }
}

class RequestParamNotFoundError extends BaseError{
    constructor(...args) {
        super(...args)
    }
}