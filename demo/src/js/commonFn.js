export default {
    scrollPushFn(unarr, pusharr) {
        if (unarr.length != 0) {
            for (let i = 0; i < unarr.length; i++) {
                for (let j = 0; j < pusharr.length; j++) {
                    if (pusharr[j].TASKID == unarr[i].TASKID) {
                        pusharr.splice(j, 1)
                    }
                }
            }
            unarr.push(...pusharr)
        } else {
            unarr.push(...pusharr)
        }
        return unarr;
    }
}