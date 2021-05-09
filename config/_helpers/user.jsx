const setToken = (data) => {
    localStorage.setItem('accessAdminToken', data)
}

const getToken = () => {
    if (process.browser) {
        return localStorage.getItem('accessAdminToken')
    } else {
        return false
    }
}

const removeToken = () => {
    if (process.browser) {
        localStorage.removeItem('accessAdminToken')
        localStorage.removeItem('permissions')
        location.replace('/login')
    }
}

const setPermission = (permission) => {
    localStorage.setItem('permissions', JSON.stringify(permission))
}

const checkPermission = (permission) => {
    if (process.browser) {
        const permissions = JSON.parse(localStorage.getItem('permissions'))
        if (permissions && permissions.includes(permission)) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export { setToken, getToken, removeToken, setPermission, checkPermission }