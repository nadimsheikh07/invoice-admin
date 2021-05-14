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

// start crm module
subitems = []

if (checkPermission('companies.index')) {
    subitems.push({
        "id": "companies",
        "icon": "settings",
        "name": "companies",
        "link": "/companies"
    })
}
if (checkPermission('customers.index')) {
    subitems.push({
        "id": "customers",
        "icon": "settings",
        "name": "customers",
        "link": "/customers"
    })
}

if (checkPermission('purchases.index')) {
    subitems.push({
        "id": "purchases",
        "icon": "settings",
        "name": "purchases",
        "link": "/purchases"
    })
}
if (checkPermission('sales.index')) {
    subitems.push({
        "id": "sales",
        "icon": "settings",
        "name": "sales",
        "link": "/sales"
    })
}
if (checkPermission('inventories.index')) {
    subitems.push({
        "id": "inventories",
        "icon": "settings",
        "name": "inventories",
        "link": "/inventories"
    })
}

if (subitems.length) {
    menuData.push({
        "id": "crmModule",
        "title": "",
        "items": [
            {
                "id": "crm",
                "icon": "",
                "name": "crm",
                "subitems": subitems
            }
        ]
    })
}

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
