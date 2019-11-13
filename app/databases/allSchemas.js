import Realm, { schemaVersion } from 'realm'

export const HOUSE_SCHEMA = 'House'
export const PROJECT_SCHEMA = 'Project'
export const FLOOR_SCHEMA = 'Floor'
export const PRODUCT_SCHEMA = 'Product'
export const CONTRACT_SCHEMA = 'Contract'
export const INVOICEEW_SCHEMA = 'InvoiceEW'
export const INVOICEEWDETAIL_SCHEMA = 'InvoiceEWDetail'
export const INVOICEEWSUBDETAIL_SCHEMA = 'InvoiceEWSubDetail'
export const PROJECTPRICE_SCHEMA = 'ProjectPrice'
export const CONTRACTPRICE_SCHEMA = 'ContractPrice'
export const PRODUCTINVOICE_SCHEMA = 'ProductInvoice'
export const PRODUCTINVOICEDETAIL_SCHEMA = 'ProductInvoiceDetail'
export const CUSTOMER_SCHEMA = 'Customer'
export const RENTLOG_SCHEMA = 'RentLog'

const projectSchema = {
    name: PROJECT_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        name: 'string',
        address: 'string',
        fullAddress: 'string',
        description: 'string',
        yearBuilt: 'int?',
        houses: { type: 'list', objectType: HOUSE_SCHEMA }
    }
}

const houseSchema = {
    name: HOUSE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        name: 'string',
        projectId: 'int',
        ownerName: 'string',
        address: 'string?',
        phone: 'string?',
        email: 'string?',
        totalArea: 'double',
        numberFloors: 'int?',
        products: { type: 'list', objectType: PRODUCT_SCHEMA },
        floors: { type: 'list', objectType: FLOOR_SCHEMA }
    }
}

const floorSchema = {
    name: FLOOR_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        houseId: 'int',
        applicationId: 'int?',
        name: 'string',
        orderNo: 'int',
        totalArea: 'double',
        totalAreaRemaining: 'double?',
        totalAreaEmpty: 'double?',
        totalAreaRent: 'double?',
        products: { type: 'list', objectType: PRODUCT_SCHEMA }
    }
}

const productSchema = {
    name: PRODUCT_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        projectId: 'int',
        houseId: 'int',
        floorNo: 'int?',
        applicationId: 'int?',
        name: 'string',
        price: 'int',
        area: 'double',
        status: 'int',
        width: 'double',
        lenght: 'double',
        isMultiplyArea: 'bool',
        totalBed: 'int?',
        totalSlotInBed: 'int?',
        totalSlot: 'int?',
        availableSlot: 'int?',
        rentSlot: 'int?'
    }
}

const contractSchema = {
    name: CONTRACT_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        type: 'int?',
        code: 'string?',
        projectId: 'int',
        houseId: 'int',
        productId: 'int',
        slotId: 'int?',
        price: 'double',
        contractDate: 'date?',
        effectiveDate: 'date?',
        fromDate: 'date?',
        toDate: 'date?',
        depositMoney: 'double',
        customerId: 'int?',
        status: 'int',
        isActivated: 'bool?'
    }
}

const invoiceEWSchema = {
    name: INVOICEEW_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        year: 'int?',
        month: 'int?',
        productId: 'int',
        collectedDate: 'date?',
        code: 'string?',
        note: 'string?',
        images: 'string?'
    }
}

const invoiceEWDetailSchema = {
    name: INVOICEEWDETAIL_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        year: 'int?',
        month: 'int?',
        productId: 'int',
        collectedDate: 'date?',
        firstIndex: 'int?',
        lastIndex: 'int?',
        total: 'int?',
        note: 'string?',
        isPayment: 'bool?',
        invoiceEWId: 'int'
    }
}

const invoiceEWSubDetailSchema = {
    name: INVOICEEWSUBDETAIL_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        invoiceEWDetailId: 'int',
        type: 'int?',
        quantity: 'int',
        price: 'double',
        amount: 'double',
        orderNo: 'int?'
    }
}

const productInvoiceSchema = {
    name: PRODUCTINVOICE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        invoiceEWId: 'int?',
        name: 'string',
        code: 'string?',
        projectId: 'int',
        productId: 'int',
        slotId: 'int?',
        contractId: 'int',
        customerId: 'int?',
        type: 'int?',
        targetMonth: 'int',
        targetYear: 'int',
        amountNoDiscount: 'double',
        discount: 'double',
        amountAfterDiscount: 'double',
        vat: 'double',
        amountVAT: 'double',
        amount: 'double',
        paidAmount: 'double',
        remainAmount: 'double',
        receiptDate: 'date?',
        note: 'string?',
        isPayment: 'bool?',
    }
}

const productInvoiceDetailSchema = {
    name: PRODUCTINVOICEDETAIL_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        productInvoiceId: 'int',
        name: 'string',
        priceCode: 'string?',
        priceName: 'string',
        price: 'int',
        priceUnit: 'string?',
        indexFirst: 'int',
        indexLast: 'int',
        quantity: 'int',
        total: 'int',
        adjustment: 'double',
        finalTotal: 'int',
        projectPriceId: 'int',
        fromDate: 'date?',
        toDate: 'date?',
        month: 'int',
        year: 'int',
        customerId: 'int?',
    }
}

const projectPriceSchema = {
    name: PROJECTPRICE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        projectId: 'int',
        name: 'string',
        code: 'string?',
        unit: 'string',
        price: 'double',
        isFluctuation: 'bool?',
        isIndex: 'bool?'
    }
}

const customerSchema = {
    name: CUSTOMER_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        code: 'string?',
        type: 'int?',
        note: 'string?',
        firstName: 'string?',
        lastName: 'string?',
        fullName: 'string?',
        birthday: 'date?',
        gender: 'bool?',
        address: 'string?',
        wardId: 'int?',
        districtId: 'int?',
        cityId: 'int?',
        phone: 'string?',
        mobile: 'string?',
        email: 'string?',
        idCardNumber: 'string?',
        idCardDate: 'date?',
        idCardIssued: 'string?'
    }
}

const rentLogSchema = {
    name: RENTLOG_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        productId: 'int',
        customerId: 'int',
        isCurrent: 'bool?',
        name: 'string',
        contractId: 'int',
        isContractSign: 'bool?',
        checkInDate: 'date?',
        checkOutDate: 'date?'
    }
}

const contractPriceSchema = {
    name: CONTRACTPRICE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        remoteId: 'int?',
        applicationId: 'int?',
        projectPriceId: 'int',
        productId: 'int',
        name: 'string',
        code: 'string?',
        unit: 'string',
        price: 'double',
        quantity: 'int',
        isFluctuation: 'bool?',
        isPaymentBefore: 'bool?',
        adjustment: 'double?'
    }
}

const databaseOptions = {
    path: 'nozzaOwner.realm',
    schema: [projectSchema, houseSchema, floorSchema, productSchema, contractSchema, projectPriceSchema,
        contractPriceSchema, invoiceEWSchema, invoiceEWDetailSchema, invoiceEWSubDetailSchema, productInvoiceSchema,
        productInvoiceDetailSchema, rentLogSchema, customerSchema],
    schemaVersion: 2,
}

export const insertNewProject = newProject => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(PROJECT_SCHEMA, newProject)
            resolve(newProject)
        })
    }).catch(error => reject(error))
})

export const insertNewHouse = newHouse => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(HOUSE_SCHEMA, newHouse)
            resolve(newHouse)
        })
    }).catch(error => reject(error))
})

export const insertNewFloor = newFloor => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(FLOOR_SCHEMA, newFloor)
            resolve(newFloor)
        })
    }).catch(error => reject(error))
})

export const insertNewProduct = newProduct => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(PRODUCT_SCHEMA, newProduct)
            resolve(newProduct)
        })
    }).catch(error => reject(error))
})

export const insertNewContract = newContract => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(CONTRACT_SCHEMA, newContract)
            resolve(newContract)
        })
    }).catch(error => reject(error))
})

export const insertNewProjectPrice = newProjectPrice => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(PROJECTPRICE_SCHEMA, newProjectPrice)
            resolve(newProjectPrice)
        })
    }).catch(error => reject(error))
})

export const insertNewCustomer = newCustomer => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(CUSTOMER_SCHEMA, newCustomer)
            resolve(newCustomer)
        })
    }).catch(error => reject(error))
})

export const insertNewContractPrice = newContractPrice => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(CONTRACTPRICE_SCHEMA, newContractPrice)
            resolve(newContractPrice)
        })
    }).catch(error => reject(error))
})

export const insertNewRentLog = newRentLog => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(RENTLOG_SCHEMA, newRentLog)
            resolve(newRentLog)
        })
    }).catch(error => reject(error))
})

export const insertNewInvoiceEW = newInvoiceEW => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(INVOICEEW_SCHEMA, newInvoiceEW)
            resolve(newInvoiceEW)
        })
    }).catch(error => reject(error))
})

export const updateInvoiceEW = invoiceEW => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(INVOICEEW_SCHEMA, invoiceEW, true)
            resolve(invoiceEW)
        })
    }).catch(error => reject(error))
})

export const insertNewInvoiceEWDetail = newInvoiceEWDetail => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(INVOICEEWDETAIL_SCHEMA, newInvoiceEWDetail)
            resolve(newInvoiceEWDetail)
        })
    }).catch(error => reject(error))
})

export const updateInvoiceEWDetail = invoiceEWDetail => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(INVOICEEWDETAIL_SCHEMA, invoiceEWDetail, true)
            resolve(invoiceEWDetail)
        })
    }).catch(error => reject(error))
})

export const insertNewInvoiceEWSubDetail = newInvoiceEWSubDetail => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(INVOICEEWSUBDETAIL_SCHEMA, newInvoiceEWSubDetail)
            resolve(newInvoiceEWSubDetail)
        })
    }).catch(error => reject(error))
})

export const updateInvoiceEWSubDetail = invoiceEWSubDetail => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(INVOICEEWSUBDETAIL_SCHEMA, invoiceEWSubDetail, true)
            resolve(invoiceEWSubDetail)
        })
    }).catch(error => reject(error))
})

export const insertNewProductInvoice = newProductInvoice => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(PRODUCTINVOICE_SCHEMA, newProductInvoice)
            resolve(newProductInvoice)
        })
    }).catch(error => reject(error))
})

export const insertNewProductInvoiceDetail = newProductInvoiceDetail => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(PRODUCTINVOICEDETAIL_SCHEMA, newProductInvoiceDetail)
            resolve(newProductInvoiceDetail)
        })
    }).catch(error => reject(error))
})

export const updateContract = contract => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(CONTRACT_SCHEMA, contract, true)
            resolve(contract)
        })
    }).catch(error => reject(error))
})

export const updateProjectPrice = projectPrice => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(PROJECTPRICE_SCHEMA, projectPrice, true)
            resolve(projectPrice)
        })
    }).catch(error => reject(error))
})

export const updateProductStatus = productId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updateProduct = realm.objectForPrimaryKey(PRODUCT_SCHEMA, productId)
            updateProduct.status = 1
            resolve()
        })
    }).catch(error => reject(error))
})

export const updateProductInvoice = productInvoice => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updateProductInvoice = realm.objectForPrimaryKey(PRODUCTINVOICE_SCHEMA, productInvoice.id)
            updateProductInvoice.remainAmount = productInvoice.remainAmount
            updateProductInvoice.paidAmount = productInvoice.paidAmount
            updateProductInvoice.isPayment = productInvoice.isPayment
            resolve()
        })
    }).catch(error => reject(error))
})

// export const deleteBuilding = buildingId => new Promise((resolve, reject) => {
//     Realm.open(databaseOptions).then(realm => {
//         realm.write(() => {
//             let deleteBuilding = realm.objectForPrimaryKey(BUILDING_SCHEMA, buildingId)
//             realm.delete(deleteBuilding)
//             resolve()
//         })
//     }).catch(error => reject(error))
// })

export const deleteAllProject = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allProject = realm.objects(PROJECT_SCHEMA)
            realm.delete(allProject)
            resolve()
        })
    }).catch(error => reject(error))
})

export const queryAllProject = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allProject = realm.objects(PROJECT_SCHEMA)
            resolve(allProject)
        })
    }).catch(error => reject(error))
})

export const queryAllHouse = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allHouse = realm.objects(HOUSE_SCHEMA)
            resolve(allHouse)
        })
    }).catch(error => reject(error))
})

export const queryAllHouseByProjectId = projectId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allHouse = realm.objects(HOUSE_SCHEMA).filtered('projectId = ' + projectId)
            resolve(allHouse)
        })
    }).catch(error => reject(error))
})

export const queryAllProjectPriceByProjectId = projectId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allProjectPrice = realm.objects(PROJECTPRICE_SCHEMA).filtered('projectId = ' + projectId)
            resolve(allProjectPrice)
        })
    }).catch(error => reject(error))
})

export const queryAllContractPriceByProductId = projectId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allContractPrice = realm.objects(CONTRACTPRICE_SCHEMA).filtered('productId = ' + projectId)
            resolve(allContractPrice)
        })
    }).catch(error => reject(error))
})

export const queryAllProductInvoiceDetailByProductInvoiceId = productInvoiceId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allProductInvoiceDetail = realm.objects(PRODUCTINVOICEDETAIL_SCHEMA).filtered('productInvoiceId = ' + productInvoiceId)
            resolve(allProductInvoiceDetail)
        })
    }).catch(error => reject(error))
})

export const queryAllProductByHouseId = (houseId, projectId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allProduct = realm.objects(PRODUCT_SCHEMA).filtered('houseId = ' + houseId + ' AND projectId = ' + projectId)
            resolve(allProduct)
        })
    }).catch(error => reject(error))
})

export const queryAllProductByHouseIdFilterByStatus = (houseId, status, projectId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allProduct = realm.objects(PRODUCT_SCHEMA).filtered('houseId = ' + houseId + ' AND status = ' + status + ' AND projectId = ' + projectId)
            resolve(allProduct)
        })
    }).catch(error => reject(error))
})

export const queryAllProductInvoiceByProductIdFilterByMonthYear = (month, year, productId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allProductInvoice = realm.objects(PRODUCTINVOICE_SCHEMA).filtered('targetMonth = ' + month + ' AND targetYear = ' + year + ' AND productId = ' + productId)
            resolve(allProductInvoice)
        })
    }).catch(error => reject(error))
})

export const queryAllContractByHouseId = (houseId, projectId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allProduct = realm.objects(CONTRACT_SCHEMA).filtered('houseId = ' + houseId + ' AND projectId = ' + projectId)
            resolve(allProduct)
        })
    }).catch(error => reject(error))
})

export const queryAllContractByHouseIdFilterByStatus = (houseId, status, projectId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allProduct = realm.objects(CONTRACT_SCHEMA).filtered('houseId = ' + houseId + ' AND status = ' + status + ' AND projectId = ' + projectId)
            resolve(allProduct)
        })
    }).catch(error => reject(error))
})

export const queryAllFloor = houseId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allFloor = realm.objects(FLOOR_SCHEMA).filtered('houseId = ' + houseId)
            resolve(allFloor)
        })
    }).catch(error => reject(error))
})

export const queryAllProduct = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allProduct = realm.objects(PRODUCT_SCHEMA)
            resolve(allProduct)
        })
    }).catch(error => reject(error))
})

export default new Realm(databaseOptions)