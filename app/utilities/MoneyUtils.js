var numeral = require('numeral');

const moneyFormat = (number) => {
    return numeral(number).format('0,0');
}

export {
    moneyFormat
}