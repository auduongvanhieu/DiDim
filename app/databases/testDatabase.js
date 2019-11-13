const allItems = [
    { id: 0, name: 'A.101', buildingArea: '18,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'A.101', reportBy: 'An', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/09/01', actionDate: '2018/09/03', maintainceStatus: 0, content: 'Sự cố', statusString: 'Mới' },
    { id: 1, name: 'A.102', buildingArea: '12,500', phone: '0909666999', price: '4.000.000', area: '50,00m2 (5 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'A.102', reportBy: 'Hải', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Tưới cây cảnh dưới sân', statusString: 'Đã sửa' },
    { id: 2, name: 'A.103', buildingArea: '6,500', phone: '0909666999', price: '5.000.000', area: '60,00m2 (6 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 35, waterLastIndex: 50, electricFirstIndex: 30, electricLastIndex: 85, name: 'A.103', reportBy: 'Luân', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 3, content: 'Bảo dưỡng thang máy', statusString: 'Huỷ' },
    { id: 3, name: 'A.104', buildingArea: '13,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Thuý', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4800000', payment: '0', name: 'A.104', reportBy: 'Thuỷ', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 2, content: 'Bảo trì hệ thống điện', statusString: 'Đang sửa' },
    { id: 4, name: 'A.105', buildingArea: '5,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'An', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4400000', payment: '0', name: 'A.105', reportBy: 'Hải', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo trì hệ thống ống nước', statusString: 'Mới' }
]

const allItemsB = [
    { id: 0, name: 'B.101', buildingArea: '4,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'B.101', reportBy: 'An', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo trì hệ thống điện', statusString: 'Mới' },
    { id: 1, name: 'B.102', buildingArea: '16,500', phone: '0909666999', price: '4.000.000', area: '60,00m2 (6 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'B.102', reportBy: 'Thuỷ', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 3, content: 'Bảo dưỡng thang máy', statusString: 'Huỷ' },
    { id: 2, name: 'B.103', buildingArea: '9,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'B.103', reportBy: 'Huy', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Bảo trì hệ thống ống nước', statusString: 'Đã sửa' },
]

const allItemsC = [
    { id: 0, name: 'C.101', buildingArea: '15,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'C.101', reportBy: 'Hải', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', status: 0, content: 'Bảo trì hệ thống điện', statusString: 'Mới' },
    { id: 1, name: 'C.102', buildingArea: '13,500', phone: '0909666999', price: '4.000.000', area: '55,00m2 (5,5 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'C.102', reportBy: 'Luân', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Tưới cây cảnh dưới sân', statusString: 'Đã sửa' },
    { id: 2, name: 'C.103', buildingArea: '11,500', phone: '0909666999', price: '5.000.000', area: '60,00m2 (6 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'C.103', reportBy: 'Thuý', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 2, content: 'Bảo trì hệ thống ống nước', statusString: 'Đang sửa' },
    { id: 3, name: 'C.104', buildingArea: '7,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Thuý', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4800000', payment: '0', name: 'C.104', reportBy: 'Tuấn', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 3, content: 'Bảo dưỡng thang máy', statusString: 'Huỷ' },
    { id: 4, name: 'C.105', buildingArea: '3,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'An', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4400000', payment: '0', name: 'C.105', reportBy: 'Hồng', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Sự cố', statusString: 'Đã sửa' }
]

const allItemsD = [
    { id: 0, name: 'D.101', buildingArea: '1,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'D.101', reportBy: 'Thuỷ', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo dưỡng thang máy', statusString: 'Mới' },
    { id: 1, name: 'D.102', buildingArea: '4,500', phone: '0909666999', price: '4.000.000', area: '50,00m2 (5 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'D.102', reportBy: 'Bình', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Bảo trì hệ thống ống nước', statusString: 'Đã sửa' },
    { id: 2, name: 'D.103', buildingArea: '6,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'D.103', reportBy: 'An', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Bảo trì hệ thống điện', statusString: 'Đã sửa' },
]

const allItemsE = [
    { id: 0, name: 'E.101', buildingArea: '9,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'E.101', reportBy: 'Ngân', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo dưỡng thang máy', statusString: 'Mới' },
    { id: 1, name: 'E.102', buildingArea: '5,500', phone: '0909666999', price: '4.000.000', area: '70,00m2 (7 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'E.102', reportBy: 'Luân', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Bảo trì hệ thống điện', statusString: 'Đã sửa' },
    { id: 2, name: 'E.103', buildingArea: '7,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'E.103', reportBy: 'Hải', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Tưới cây cảnh dưới sân', statusString: 'Đã sửa' },
    { id: 3, name: 'E.104', buildingArea: '2,500', phone: '0909666999', price: '2.000.000', area: '80,00m2 (8 x 10)', contractPerson: 'Thuý', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4800000', payment: '0', name: 'E.104', reportBy: 'Tiến', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo trì hệ thống ống nước', statusString: 'Mới' },
    { id: 4, name: 'E.105', buildingArea: '1,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'An', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4400000', payment: '0', name: 'E.105', reportBy: 'Thuỷ', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Sự cố', statusString: 'Mới' }
]

const citylandArray = [
    {
        Id: 0,
        value: 'Toà nhà A',
        isSelected: true,
        allItems: allItems
    },
    {
        Id: 1,
        value: 'Toà nhà B',
        isSelected: false,
        allItems: allItemsB
    },
    {
        Id: 2,
        value: 'Toà nhà C',
        isSelected: false,
        allItems: allItemsC
    },
    {
        Id: 3,
        value: 'Toà nhà D',
        isSelected: false,
        allItems: allItemsD
    },
    {
        Id: 4,
        value: 'Toà nhà E',
        isSelected: false,
        allItems: allItemsE
    },
]

const novaAllItems = [
    { id: 0, name: 'A.101', buildingArea: '3,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'A.101', reportBy: 'An', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/09/01', actionDate: '2018/09/03', maintainceStatus: 0, content: 'Sự cố', statusString: 'Mới' },
    { id: 1, name: 'A.102', buildingArea: '3,500', phone: '0909666999', price: '4.000.000', area: '50,00m2 (5 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'A.102', reportBy: 'Hải', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Tưới cây cảnh dưới sân', statusString: 'Đã sửa' },
    { id: 2, name: 'A.103', buildingArea: '15,500', phone: '0909666999', price: '5.000.000', area: '60,00m2 (6 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 35, waterLastIndex: 50, electricFirstIndex: 30, electricLastIndex: 85, name: 'A.103', reportBy: 'Luân', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 3, content: 'Bảo dưỡng thang máy', statusString: 'Huỷ' },
    { id: 3, name: 'A.104', buildingArea: '8,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Thuý', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4800000', payment: '0', name: 'A.104', reportBy: 'Thuỷ', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 2, content: 'Bảo trì hệ thống điện', statusString: 'Đang sửa' },
    { id: 4, name: 'A.105', buildingArea: '1,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'An', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4400000', payment: '0', name: 'A.105', reportBy: 'Hải', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo trì hệ thống ống nước', statusString: 'Mới' }
]

const novaAllItemsB = [
    { id: 0, name: 'B.101', buildingArea: '4,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'B.101', reportBy: 'An', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo trì hệ thống điện', statusString: 'Mới' },
    { id: 1, name: 'B.102', buildingArea: '12,500', phone: '0909666999', price: '4.000.000', area: '60,00m2 (6 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'B.102', reportBy: 'Thuỷ', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 3, content: 'Bảo dưỡng thang máy', statusString: 'Huỷ' },
    { id: 2, name: 'B.103', buildingArea: '1,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'B.103', reportBy: 'Huy', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Bảo trì hệ thống ống nước', statusString: 'Đã sửa' },
]

const novaAllItemsC = [
    { id: 0, name: 'C.101', buildingArea: '5,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'C.101', reportBy: 'Hải', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo trì hệ thống điện', statusString: 'Mới' },
    { id: 1, name: 'C.102', buildingArea: '14,500', phone: '0909666999', price: '4.000.000', area: '55,00m2 (5,5 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'C.102', reportBy: 'Luân', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Tưới cây cảnh dưới sân', statusString: 'Đã sửa' },
    { id: 2, name: 'C.103', buildingArea: '1,500', phone: '0909666999', price: '5.000.000', area: '60,00m2 (6 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'C.103', reportBy: 'Thuý', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 2, content: 'Bảo trì hệ thống ống nước', statusString: 'Đang sửa' },
    { id: 3, name: 'C.104', buildingArea: '7,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Thuý', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4800000', payment: '0', name: 'C.104', reportBy: 'Tuấn', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 3, content: 'Bảo dưỡng thang máy', statusString: 'Huỷ' },
    { id: 4, name: 'C.105', buildingArea: '1,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'An', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4400000', payment: '0', name: 'C.105', reportBy: 'Hồng', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Sự cố', statusString: 'Đã sửa' }
]

const novalandArray = [
    {
        Id: 0,
        value: 'Nova A',
        isSelected: true,
        allItems: novaAllItems
    },
    {
        Id: 1,
        value: 'Nova B',
        isSelected: false,
        allItems: novaAllItemsB
    },
    {
        Id: 2,
        value: 'Nova C',
        isSelected: false,
        allItems: novaAllItemsC
    },
]

const vinhomeAllItems = [
    { id: 0, name: 'A.101', buildingArea: '18,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'A.101', reportBy: 'An', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/09/01', actionDate: '2018/09/03', maintainceStatus: 0, content: 'Sự cố', statusString: 'Mới' },
    { id: 1, name: 'A.102', buildingArea: '8,500', phone: '0909666999', price: '4.000.000', area: '50,00m2 (5 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'A.102', reportBy: 'Hải', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Tưới cây cảnh dưới sân', statusString: 'Đã sửa' },
    { id: 2, name: 'A.103', buildingArea: '4,500', phone: '0909666999', price: '5.000.000', area: '60,00m2 (6 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 35, waterLastIndex: 50, electricFirstIndex: 30, electricLastIndex: 85, name: 'A.103', reportBy: 'Luân', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 3, content: 'Bảo dưỡng thang máy', statusString: 'Huỷ' },
    { id: 3, name: 'A.104', buildingArea: '13,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Thuý', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4800000', payment: '0', name: 'A.104', reportBy: 'Thuỷ', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 2, content: 'Bảo trì hệ thống điện', statusString: 'Đang sửa' },
    { id: 4, name: 'A.105', buildingArea: '1,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'An', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4400000', payment: '0', name: 'A.105', reportBy: 'Hải', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo trì hệ thống ống nước', statusString: 'Mới' }
]

const vinhomeAllItemsB = [
    { id: 0, name: 'B.101', buildingArea: '3,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'B.101', reportBy: 'An', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo trì hệ thống điện', statusString: 'Mới' },
    { id: 1, name: 'B.102', buildingArea: '7,500', phone: '0909666999', price: '4.000.000', area: '60,00m2 (6 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'B.102', reportBy: 'Thuỷ', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 3, content: 'Bảo dưỡng thang máy', statusString: 'Huỷ' },
    { id: 2, name: 'B.103', buildingArea: '1,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'B.103', reportBy: 'Huy', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Bảo trì hệ thống ống nước', statusString: 'Đã sửa' },
]

const vinhomeAllItemsC = [
    { id: 0, name: 'C.101', buildingArea: '3,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'C.101', reportBy: 'Hải', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo trì hệ thống điện', statusString: 'Mới' },
    { id: 1, name: 'C.102', buildingArea: '6,500', phone: '0909666999', price: '4.000.000', area: '55,00m2 (5,5 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'C.102', reportBy: 'Luân', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Tưới cây cảnh dưới sân', statusString: 'Đã sửa' },
    { id: 2, name: 'C.103', buildingArea: '1,500', phone: '0909666999', price: '5.000.000', area: '60,00m2 (6 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'C.103', reportBy: 'Thuý', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 2, content: 'Bảo trì hệ thống ống nước', statusString: 'Đang sửa' },
    { id: 3, name: 'C.104', buildingArea: '13,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Thuý', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4800000', payment: '0', name: 'C.104', reportBy: 'Tuấn', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 3, content: 'Bảo dưỡng thang máy', statusString: 'Huỷ' },
    { id: 4, name: 'C.105', buildingArea: '1,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'An', fromDate: '2017/09/01', toDate: '2018/10/01', status: 0, statusString: 'Chưa chốt', total: '4400000', payment: '0', name: 'C.105', reportBy: 'Hồng', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Sự cố', statusString: 'Đã sửa' }
]

const vinhomeAllItemsD = [
    { id: 0, name: 'D.101', buildingArea: '2,500', phone: '0909666999', price: '2.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Nguyễn Văn Hải', fromDate: '2017/09/01', toDate: '2018/09/01', status: 0, statusString: 'Chưa chốt', total: '5500000', payment: '0', name: 'D.101', reportBy: 'Thuỷ', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 0, content: 'Bảo dưỡng thang máy', statusString: 'Mới' },
    { id: 1, name: 'D.102', buildingArea: '4,500', phone: '0909666999', price: '4.000.000', area: '50,00m2 (5 x 10)', contractPerson: 'Luân', fromDate: '2017/09/01', toDate: '2019/09/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4500000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'D.102', reportBy: 'Bình', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Bảo trì hệ thống ống nước', statusString: 'Đã sửa' },
    { id: 2, name: 'D.103', buildingArea: '1,500', phone: '0909666999', price: '5.000.000', area: '40,00m2 (4 x 10)', contractPerson: 'Hải', fromDate: '2017/09/01', toDate: '2018/10/01', status: 1, statusString: 'Đã chốt', total: '4500000', payment: '4000000', waterFirstIndex: 20, waterLastIndex: 30, electricFirstIndex: 50, electricLastIndex: 70, name: 'D.103', reportBy: 'An', actionPerson: 'Ban quản lý toà nhà', reportDate: '2018/10/27', actionDate: '2018/10/29', maintainceStatus: 1, content: 'Bảo trì hệ thống điện', statusString: 'Đã sửa' },
]

const vinhomeArray = [
    {
        Id: 0,
        value: 'Vinhome A',
        isSelected: true,
        allItems: vinhomeAllItems
    },
    {
        Id: 1,
        value: 'Vinhome B',
        isSelected: false,
        allItems: vinhomeAllItemsB
    },
    {
        Id: 2,
        value: 'Vinhome C',
        isSelected: false,
        allItems: vinhomeAllItemsC
    },
    {
        Id: 3,
        value: 'Vinhome D',
        isSelected: false,
        allItems: vinhomeAllItemsD
    },
]

const projectArray = [
    {
        Id: 0,
        value: 'Cityland',
        address: '24 Nguyễn Bỉnh Khiêm',
        district: 'P.Đa Khao, Q.1',
        city: 'TP.HCM',
        isSelected: true,
        building: citylandArray
    },
    {
        Id: 1,
        value: 'Novaland',
        address: '65 Nguyễn Du',
        district: 'P.Đa Khao, Q.1',
        city: 'TP.HCM',
        isSelected: false,
        building: novalandArray
    },
    {
        Id: 2,
        value: 'Vinhome Central Park',
        address: '67 Mai Chí Thọ',
        district: 'P.An Phú, Q.2',
        city: 'TP.HCM',
        isSelected: false,
        building: vinhomeArray
    },
]

export {
    projectArray
}