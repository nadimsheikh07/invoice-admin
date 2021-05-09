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
            "link": "/admin"
        }
    ]
})


// start location module
subitems = []

if (checkPermission('countries.index')) {
    subitems.push({
        "id": "countries",
        "icon": "",
        "name": "countries",
        "link": "/countries"
    })
}
if (checkPermission('states.index')) {
    subitems.push({
        "id": "states",
        "icon": "",
        "name": "states",
        "link": "/states"
    })
}
if (checkPermission('cities.index')) {
    subitems.push({
        "id": "cities",
        "icon": "",
        "name": "cities",
        "link": "/cities"
    })
}
if (subitems.length) {
    menuData.push({
        "id": "locationModule",
        "title": "",
        "items": [
            {
                "id": "countries",
                "name": "location",
                "icon": "place",
                "subitems": subitems
            }
        ]
    })
}

// end location module

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

if (checkPermission('distributors.index')) {
    subitems.push({
        "id": "distributors",
        "icon": "persons",
        "name": "distributors",
        "link": "/distributors"
    })
}
if (checkPermission('promotors.index')) {
    subitems.push({

        "id": "promotors",
        "icon": "persons",
        "name": "promotors",
        "link": "/promotors"
    }

    )
}
if (checkPermission('franchises.index')) {
    subitems.push({
        "id": "franchises",
        "icon": "persons",
        "name": "franchises",
        "link": "/franchises"
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


if (checkPermission('plans.index')) {
    menuData.push({
        "id": 6,
        "title": "",
        "items": [
            {
                "id": "plans",
                "icon": "next_plan",
                "name": "plans",
                "link": "/plans"
            }
        ]
    })
}
if (checkPermission('news.index')) {
    menuData.push({
        "id": "newsModule",
        "title": "",
        "items": [
            {
                "id": "news",
                "icon": "next_plan",
                "name": "news",
                "link": "/news"
            }
        ]
    })
}
if (checkPermission('franchise_amounts.index')) {
    menuData.push({
        "id": "franchiseAmountsModule",
        "title": "",
        "items": [
            {
                "id": "franchise_amounts",
                "icon": "next_plan",
                "name": "franchise_amounts",
                "link": "/franchise_amounts"
            }
        ]
    })
}

// if (checkPermission('settings')) {
//     menuData.push({
//         "id": 'settingModule',
//         "title": "",
//         "items": [
//             {
//                 "id": "settings",
//                 "icon": "settings",
//                 "name": "settings",
//                 "link": "/settings"
//             }
//         ]
//     })
// }


if (checkPermission('commissions.index')) {
    menuData.push({
        "id": 'commissionsModule',
        "title": "",
        "items": [
            {
                "id": "commissions",
                "icon": "money",
                "name": "commissions",
                "link": "/commissions"
            }
        ]
    })
}




export const menuConstants = {
    data: menuData,
}
