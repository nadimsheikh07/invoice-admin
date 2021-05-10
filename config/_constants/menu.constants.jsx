import { checkPermission } from "../_helpers/user"

let menuData = []
let subitems = []

menuData.push({
    "id": 1,
    "title": "",
    "items": [
        {
            "id": "dashboard",
            "icon": "dashboard",
            "name": "dashboard",
            "link": "/dashboard"
        }
    ]
})



// start user module
subitems = []
if (checkPermission('permissions.index')) {
    subitems.push({
        "id": "permissions",
        "icon": "settings",
        "name": "permissions",
        "link": "/permissions"
    })
}
if (checkPermission('roles.index')) {
    subitems.push({
        "id": "roles",
        "icon": "group",
        "name": "roles",
        "link": "/roles"
    })
}
if (checkPermission('users.index')) {
    subitems.push({
        "id": "users",
        "icon": "persons",
        "name": "users",
        "link": "/users"
    })
}

if (subitems.length) {
    menuData.push({
        "id": "userModule",
        "title": "",
        "items": [
            {
                "id": "users",
                "icon": "persons",
                "name": "users",
                "subitems": subitems
            }
        ]
    })
}

// end user module



// start item module
subitems = []

if (checkPermission('categories.index')) {
    subitems.push({
        "id": "categories",
        "icon": "settings",
        "name": "categories",
        "link": "/categories"
    })
}
if (checkPermission('items.index')) {
    subitems.push({
        "id": "items",
        "icon": "settings",
        "name": "items",
        "link": "/items"
    })
}
if (subitems.length) {
    menuData.push({
        "id": "itemModule",
        "title": "",
        "items": [
            {
                "id": "items",
                "icon": "",
                "name": "items",
                "subitems": subitems
            }
        ]
    })
}

// end item module

if (checkPermission('settings')) {
    menuData.push({
        "id": 'settingModule',
        "title": "",
        "items": [
            {
                "id": "settings",
                "icon": "settings",
                "name": "settings",
                "link": "/settings"
            }
        ]
    })
}


export const menuConstants = {
    data: menuData,
}
