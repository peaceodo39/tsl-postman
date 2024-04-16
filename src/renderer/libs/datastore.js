import Datastore from 'nedb'
import path from 'path'
import {remote} from 'electron'

export default {
    api: new Datastore({
        autoload: true,
        filename: path.join(remote.app.getPath('userData'), './data/api.db')
    }),
    object: new Datastore({
        autoload: true,
        filename: path.join(remote.app.getPath('userData'), './data/object.db')
    })
}