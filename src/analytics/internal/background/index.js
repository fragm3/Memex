import { makeRemotelyCallable } from 'src/util/webextensionRPC'
import EventLogStorage from './storage'

export default class EventLogBackground {
    constructor({ storageManager }) {
        this.storage = new EventLogStorage(storageManager)
    }

    setupRemoteFunctions() {
        makeRemotelyCallable({
            storeEvent: (...params) => {
                return this.storeEvent(...params)
            },
            getLatestTimeWithCount: (...params) => {
                return this.getLatestTimeWithCount(...params)
            },
        })
    }

    async storeEvent(request) {
        await this.storage.storeEvent(request)
    }

    async getLatestTimeWithCount(request) {
        return await this.storage.getLatestTimeWithCount(request)
    }
}
