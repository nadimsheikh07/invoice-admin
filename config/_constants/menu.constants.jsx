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
        "icon": "category",
        "name": "categories",
        "link": "/categories"
    })
}
if (checkPermission('items.index')) {
    subitems.push({
        "id": "items",
        "icon": "donut_small",
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
                "icon": "list_alt",
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
        "icon": "business",
        "name": "companies",
        "link": "/companies"
    })
}
if (checkPermission('customers.index')) {
    subitems.push({
        "id": "customers",
        "icon": "people_alt",
        "name": "customers",
        "link": "/customers"
    })
}

if (checkPermission('purchases.index')) {
    subitems.push({
        "id": "purchases",
        "icon": "description",
        "name": "purchases",
        "link": "/purchases"
    })
}
if (checkPermission('sales.index')) {
    subitems.push({
        "id": "sales",
        "icon": "receipt",
        "name": "sales",
        "link": "/sales"
    })
}
if (checkPermission('inventories.index')) {
    subitems.push({
        "id": "inventories",
        "icon": "inventory",
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
                "icon": "store",
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
