import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as Team from './team'

admin.initializeApp(functions.config().firebase)

export const join = Team.join;
export const ping = functions.https.onRequest((req,res) => res.send('pong'));