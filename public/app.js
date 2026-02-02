/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/native.js"
/*!******************************************!*\
  !*** ./node_modules/uuid/dist/native.js ***!
  \******************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ randomUUID });


/***/ },

/***/ "./node_modules/uuid/dist/regex.js"
/*!*****************************************!*\
  !*** ./node_modules/uuid/dist/regex.js ***!
  \*****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);


/***/ },

/***/ "./node_modules/uuid/dist/rng.js"
/*!***************************************!*\
  !*** ./node_modules/uuid/dist/rng.js ***!
  \***************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}


/***/ },

/***/ "./node_modules/uuid/dist/stringify.js"
/*!*********************************************!*\
  !*** ./node_modules/uuid/dist/stringify.js ***!
  \*********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/validate.js");

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);


/***/ },

/***/ "./node_modules/uuid/dist/v4.js"
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v4.js ***!
  \**************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/stringify.js");



function _v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0,_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}
function v4(options, buf, offset) {
    if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
        return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
    }
    return _v4(options, buf, offset);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);


/***/ },

/***/ "./node_modules/uuid/dist/validate.js"
/*!********************************************!*\
  !*** ./node_modules/uuid/dist/validate.js ***!
  \********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/regex.js");

function validate(uuid) {
    return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);


/***/ },

/***/ "./src/app.js"
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _crud_code_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crud-code.js */ "./src/crud-code.js");

var InvoiceStorage = new _crud_code_js__WEBPACK_IMPORTED_MODULE_0__["default"]('my_invoices');
var currentPage = window.location.pathname;

// -----------------------------------------------------------------------------------------------
// Sąskaitos nr ir data
var SaskaitosNr = document.querySelector('div.sask-nr-div > p');
var SaskaitosData = document.querySelector('div.sask-date-div > p');
var PrintInvoiceNrAndDate = function PrintInvoiceNrAndDate(NrAndDate) {
  var InvoiceNrTag = document.createElement('span');
  // NrAndDate.number;
  InvoiceNrTag.innerText = NrAndDate.number;
  InvoiceNrTag.classList.add('sask-nr');
  SaskaitosNr.appendChild(InvoiceNrTag);
  var InvoiceDateTag = document.createElement('span');
  // NrAndDate.date;
  InvoiceDateTag.innerText = NrAndDate.date;
  InvoiceDateTag.classList.add('sask-data');
  SaskaitosData.appendChild(InvoiceDateTag);
};

// -----------------------------------------------------------------------------------------------
// Pirkėjo duomenys

var Pirkejas = document.querySelectorAll('section.buyer-seller > div.buyer > p');
var PrintBuyerData = function PrintBuyerData(BuyerData) {
  // Determine if we are in a mode that allows editing
  var isEditable = currentPage.includes('edit.html') && !window.location.search.includes('id=');
  var fields = [{
    value: BuyerData.company.buyer.name
  }, {
    value: BuyerData.company.buyer.address
  }, {
    value: BuyerData.company.buyer.code
  }, {
    value: BuyerData.company.buyer.vat
  }, {
    value: BuyerData.company.buyer.phone
  }, {
    value: BuyerData.company.buyer.email
  }];
  fields.forEach(function (field, index) {
    var tag;
    if (isEditable) {
      tag = document.createElement('input');
      tag.value = field.value;
      tag.classList.add('buyer-input'); // We can style this in CSS

      // Step A.2: Sync changes back to the data object
      tag.addEventListener('input', function (e) {
        var keys = ['name', 'address', 'code', 'vat', 'phone', 'email'];
        BuyerData.company.buyer[keys[index]] = e.target.value;
      });
    } else {
      tag = document.createElement('span');
      tag.innerText = field.value;
      tag.classList.add('buyer-span');
    }
    // Clear anything existing (like labels) before appending
    Pirkejas[index].appendChild(tag);
  });

  // const CompanyNameTag = document.createElement('span');
  // CompanyNameTag.innerText = BuyerData.company.buyer.name;
  // CompanyNameTag.classList.add('buyer-span');
  // Pirkejas[0].appendChild(CompanyNameTag);

  // const CompanyAddress = document.createElement('span');
  // CompanyAddress.innerText = BuyerData.company.buyer.address;
  // CompanyAddress.classList.add('buyer-span');
  // Pirkejas[1].appendChild(CompanyAddress);

  // const CompanyCode = document.createElement('span');
  // CompanyCode.innerText = BuyerData.company.buyer.code;
  // CompanyCode.classList.add('buyer-span');
  // Pirkejas[2].appendChild(CompanyCode);

  // const CompanyVATnumber = document.createElement('span');
  // CompanyVATnumber.innerText = BuyerData.company.buyer.vat;
  // CompanyVATnumber.classList.add('buyer-span');
  // Pirkejas[3].appendChild(CompanyVATnumber);

  // const CompanyMobileNumber = document.createElement('span');
  // CompanyMobileNumber.innerText = BuyerData.company.buyer.phone;
  // CompanyMobileNumber.classList.add('buyer-span');
  // Pirkejas[4].appendChild(CompanyMobileNumber);

  // const CompanyEmail = document.createElement('span');
  // CompanyEmail.innerText = BuyerData.company.buyer.email;
  // CompanyEmail.classList.add('buyer-span');
  // Pirkejas[5].appendChild(CompanyEmail);
};

// -----------------------------------------------------------------------------------------------
// Pardavėjo duomenys

var Pardavejas = document.querySelectorAll('section.buyer-seller > div.seller > p');
var PrintSellerData = function PrintSellerData(SellerData) {
  // Determine if we are in a mode that allows editing
  var isEditable = currentPage.includes('edit.html') && !window.location.search.includes('id=');
  var fields = [{
    value: SellerData.company.seller.name
  }, {
    value: SellerData.company.seller.address
  }, {
    value: SellerData.company.seller.code
  }, {
    value: SellerData.company.seller.vat
  }, {
    value: SellerData.company.seller.phone
  }, {
    value: SellerData.company.seller.email
  }];
  fields.forEach(function (field, index) {
    var tag;
    if (isEditable) {
      tag = document.createElement('input');
      tag.value = field.value;
      tag.classList.add('buyer-input'); // We can style this in CSS

      // Step A.2: Sync changes back to the data object
      tag.addEventListener('input', function (e) {
        var keys = ['name', 'address', 'code', 'vat', 'phone', 'email'];
        SellerData.company.seller[keys[index]] = e.target.value;
      });
    } else {
      tag = document.createElement('span');
      tag.innerText = field.value;
      tag.classList.add('seller-span');
    }
    // Clear anything existing (like labels) before appending
    Pardavejas[index].appendChild(tag);
  });

  // const CompanyNameTag = document.createElement('span');
  // CompanyNameTag.innerText = SellerData.company.seller.name;
  // CompanyNameTag.classList.add('seller-span');
  // Pardavejas[0].appendChild(CompanyNameTag);

  // const CompanyAddress = document.createElement('span');
  // CompanyAddress.innerText = SellerData.company.seller.address;
  // CompanyAddress.classList.add('seller-span');
  // Pardavejas[1].appendChild(CompanyAddress);

  // const CompanyCode = document.createElement('span');
  // CompanyCode.innerText = SellerData.company.seller.code;
  // CompanyCode.classList.add('seller-span');
  // Pardavejas[2].appendChild(CompanyCode);

  // const CompanyVATnumber = document.createElement('span');
  // CompanyVATnumber.innerText = SellerData.company.seller.vat;
  // CompanyVATnumber.classList.add('seller-span');
  // Pardavejas[3].appendChild(CompanyVATnumber);

  // const CompanyMobileNumber = document.createElement('span');
  // CompanyMobileNumber.innerText = SellerData.company.seller.phone;
  // CompanyMobileNumber.classList.add('seller-span');
  // Pardavejas[4].appendChild(CompanyMobileNumber);

  // const CompanyEmail = document.createElement('span');
  // CompanyEmail.innerText = SellerData.company.seller.email;
  // CompanyEmail.classList.add('seller-span');
  // Pardavejas[5].appendChild(CompanyEmail);
};

// -----------------------------------------------------------------------------------------------
// Eilės nr.  ir  Prekių pavadinimai

var EilesNr = document.querySelector('section.products-list > div.eilesNr');
var PrekesPavadinimas = document.querySelector('section.products-list > div.preke');
var PrintRowNumberAndItemName = function PrintRowNumberAndItemName(allItems) {
  var isEditable = currentPage.includes('edit.html');
  allItems.items.forEach(function (oneItem, index) {
    var IndexTag = document.createElement('p');
    IndexTag.innerText = index + 1 + '.';
    IndexTag.classList.add('prekes-listas');
    EilesNr.appendChild(IndexTag);

    // --- EDITABLE NAME ---
    var tag = isEditable ? document.createElement('input') : document.createElement('p');
    if (isEditable) {
      tag.value = oneItem.description;
      tag.classList.add('edit-name'); // You can style this in SCSS later
      tag.addEventListener('input', function (e) {
        oneItem.description = e.target.value;
        // We don't need RefreshUI here because names don't change the math
      });
    } else {
      tag.innerText = oneItem.description;
    }
    tag.classList.add('eiles-numeris');
    PrekesPavadinimas.appendChild(tag);

    // const ItemNameTag = document.createElement('p');
    // ItemNameTag.innerText = oneItem.description;
    // ItemNameTag.classList.add('prekiu-listas');
    // PrekesPavadinimas.appendChild(ItemNameTag);
  });
};

// -----------------------------------------------------------------------------------------------
// Prekių kiekis

var Kiekis = document.querySelector('section.products-list > div.kiekis');
var PrintQuantity = function PrintQuantity(allItems) {
  var isEditable = currentPage.includes('edit.html'); // && !window.location.search.includes('id=');

  allItems.items.forEach(function (oneItem) {
    var tag = isEditable ? document.createElement('input') : document.createElement('p');
    if (isEditable) {
      tag.type = 'number';
      tag.value = oneItem.quantity;
      tag.classList.add('edit-qty');

      // --- THE NEW PART ---
      // Whenever the user types, update the object and refresh the screen
      tag.addEventListener('input', function (e) {
        oneItem.quantity = Number(e.target.value);
        RefreshUI(allItems);
      });
      // --------------------
    } else {
      tag.innerText = oneItem.quantity;
    }
    tag.classList.add('prekiu-listas');
    Kiekis.appendChild(tag);

    // const QuantityTag = document.createElement('p');
    // QuantityTag.innerText = oneItem.quantity;
    // QuantityTag.classList.add('prekiu-listas');
    // Kiekis.appendChild(QuantityTag);
  });
};

// -----------------------------------------------------------------------------------------------
// Vieneto kaina

var VNTkaina = document.querySelector('section.products-list > div.vnt-kaina');
var PrintUnitPrice = function PrintUnitPrice(allItems) {
  var isEditable = currentPage.includes('edit.html');
  allItems.items.forEach(function (oneItem) {
    var tag = isEditable ? document.createElement('input') : document.createElement('p');
    if (isEditable) {
      tag.type = 'number';
      tag.step = '0.01'; // Allows decimals like 10.99
      tag.value = oneItem.price;
      tag.classList.add('edit-price');
      tag.addEventListener('input', function (e) {
        oneItem.price = Number(e.target.value);
        RefreshUI(allItems); // Math changes, so we refresh!
      });
    } else {
      tag.innerText = Number(oneItem.price.toFixed(2));
    }
    tag.classList.add('prekiu-listas');
    VNTkaina.appendChild(tag);

    // const UnitPriceTag = document.createElement('p');
    // const PriceWithDecimal = oneItem.price.toFixed(2);
    // UnitPriceTag.innerText = PriceWithDecimal;
    // UnitPriceTag.classList.add('prekiu-listas');
    // VNTkaina.appendChild(UnitPriceTag);
  });
};

// -----------------------------------------------------------------------------------------------
// Skaičiuoti SU NUOLAIDA ir BE NUOLAIDOS, tik logika,
// kurią vėliau pritaikysiu masyvui. 
// Čia be skaičių (kadangi nėr masyvo, nėr ir forEach);

var CalculateRowSums = function CalculateRowSums(item) {
  var Quantity = item.quantity;
  var ItemPrice = item.price;
  var RowSumWithoutDiscount = Quantity * ItemPrice;
  var DiscountAmount = 0;
  var SingleUnitDiscountText = '';
  if (item.discount && item.discount.type == 'fixed') {
    DiscountAmount = item.discount.value;
    SingleUnitDiscountText = "Fiksuota. -".concat(DiscountAmount.toFixed(2));
  } else if (item.discount && item.discount.type == 'percentage') {
    DiscountAmount = ItemPrice * (item.discount.value / 100);
    SingleUnitDiscountText = "-".concat(item.discount.value, "% (-").concat(DiscountAmount.toFixed(2), ")");
  } else {
    SingleUnitDiscountText = "-";
  }
  var AllItemsDiscountAmount = DiscountAmount * Quantity;
  var RowSumWithDiscount = RowSumWithoutDiscount - AllItemsDiscountAmount;
  return {
    Quantity: Quantity,
    ItemPrice: ItemPrice,
    RowSumWithoutDiscount: RowSumWithoutDiscount,
    DiscountAmount: DiscountAmount,
    SingleUnitDiscountText: SingleUnitDiscountText,
    RowSumWithDiscount: RowSumWithDiscount,
    AllItemsDiscountAmount: AllItemsDiscountAmount
  };
};

// -----------------------------------------------------------------------------------------------
// Spausdinti suskaičiuotas VNT NUOLAIDOS reikšmes 
// iš naujo .map masyvo vardu 'CalculatedRows'

var Nuolaida = document.querySelector('section.products-list > div.nuolaida');
var PrintCalculatedDiscountColumn = function PrintCalculatedDiscountColumn(CalculatedRows, allItems) {
  var activeIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var isEditable = currentPage.includes('edit.html');
  CalculatedRows.forEach(function (calculatedRow, index) {
    var container = document.createElement('div');
    container.classList.add('discount-edit-container');

    // The original item from the main data array
    var originalItem = allItems.items[index];
    if (isEditable) {
      // 1. Create Value Input
      var valInput = document.createElement('input');
      valInput.type = 'number';
      valInput.value = originalItem.discount ? originalItem.discount.value : 0;
      valInput.classList.add('edit-discount-val');

      // 2. Create Type Selector
      var typeSelect = document.createElement('select');
      typeSelect.classList.add('edit-discount-type');
      var options = [{
        val: 'none',
        text: 'Be nuolaidos'
      }, {
        val: 'percentage',
        text: '%'
      }, {
        val: 'fixed',
        text: 'Eur'
      }];
      options.forEach(function (opt) {
        var o = document.createElement('option');
        o.value = opt.val;
        o.innerText = opt.text;
        if (originalItem.discount && originalItem.discount.type === opt.val) o.selected = true;
        if (!originalItem.discount && opt.val === 'none') o.selected = true;
        typeSelect.appendChild(o);
      });

      // Event Listeners for both
      var updateDiscount = function updateDiscount() {
        var newVal = Number(valInput.value);
        var newType = typeSelect.value;
        if (newType === 'none') {
          originalItem.discount = null;
        } else {
          originalItem.discount = {
            type: newType,
            value: newVal
          };
        }
        RefreshUI(allItems, index);
      };
      valInput.addEventListener('input', updateDiscount);
      typeSelect.addEventListener('change', updateDiscount);
      container.appendChild(valInput);
      container.appendChild(typeSelect);
      Nuolaida.appendChild(container);

      // NEW: If this was the input we were just typing in, give it focus back!
      if (index === activeIndex) {
        setTimeout(function () {
          return valInput.focus();
        }, 0);
        // We use setTimeout 0 to wait until the browser finishes drawing
      }
    } else {
      // View mode (same as before)
      var DiscountTag = document.createElement('p');
      DiscountTag.innerText = calculatedRow.SingleUnitDiscountText;
      DiscountTag.classList.add('prekiu-listas');
      Nuolaida.appendChild(DiscountTag);
    }
  });
};

// -----------------------------------------------------------------------------------------------
// Spausdinti suskaičiuotas SUMA BE NUOLAIDOS IR BE PVM reikšmes 
// iš naujo .map masyvo vardu 'CalculatedRows'

var SumaBeNuolaidos = document.querySelector('section.products-list > div.suma-be-nuolaidos');
var PrintSumsWithoutDiscount = function PrintSumsWithoutDiscount(CalculatedRows) {
  CalculatedRows.forEach(function (oneSingleItem) {
    var SumNoDiscountTag = document.createElement('p');
    SumNoDiscountTag.innerText = oneSingleItem.RowSumWithoutDiscount.toFixed(2);
    SumNoDiscountTag.classList.add('prekiu-listas');
    SumaBeNuolaidos.appendChild(SumNoDiscountTag);
  });
};

// -----------------------------------------------------------------------------------------------
// Spausdinti suskaičiuotas SUMA SU NUOLAIDA IR BE PVM reikšmes 
// iš naujo .map masyvo vardu 'CalculatedRows'

var SumaSuNuolaida = document.querySelector('section.products-list > div.suma-su-nuolaida');
var PrintSumsWithDiscount = function PrintSumsWithDiscount(CalculatedRows) {
  CalculatedRows.forEach(function (oneSingleItem) {
    var SumYesDiscountTag = document.createElement('p');
    SumYesDiscountTag.innerText = oneSingleItem.RowSumWithDiscount.toFixed(2);
    SumYesDiscountTag.classList.add('prekiu-listas');
    SumaSuNuolaida.appendChild(SumYesDiscountTag);
  });
};

// -----------------------------------------------------------------------------------------------
// Skaičiuoti TOTAL SUMOS, tik logika,
// kurią vėliau pritaikysiu masyvui. 
// Čia be skaičių (kadangi nėr masyvo, nėr ir forEach);

var CalculateTotalSums = function CalculateTotalSums(CalculatedRows) {
  var shippingPrice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var ItemsTotalNoVAT = CalculatedRows.reduce(function (SumOfAllRows, SingleRowSum) {
    return SumOfAllRows + SingleRowSum.RowSumWithDiscount;
  }, 0);
  var TotalSumNoVAT = ItemsTotalNoVAT + shippingPrice;
  var VATvalue = TotalSumNoVAT * 0.21;
  var TotalSumWithVAT = TotalSumNoVAT + VATvalue;
  return {
    TotalSumNoVAT: TotalSumNoVAT,
    VATvalue: VATvalue,
    TotalSumWithVAT: TotalSumWithVAT
  };
};

// -----------------------------------------------------------------------------------------------
// Shippingas

var PridedamShipping = function PridedamShipping(allItems) {
  // const shippingas = allItems.shippingPrice;
  var isEditable = currentPage.includes('edit.html');
  var shippingRowNumber = allItems.items.length + 1;

  // Row Number
  EilesNr.insertAdjacentHTML('beforeend', "<p class=\"eiles-numeris\">".concat(shippingRowNumber, ".</p>"));

  // Description
  PrekesPavadinimas.insertAdjacentHTML('beforeend', "<p style='font-weight: 500;' class=\"prekiu-listas\">Transportavimo i\u0161laidos</p>");

  // Quantity (Fixed at 1)
  Kiekis.insertAdjacentHTML('beforeend', "<p class=\"prekiu-listas\">1</p>");

  // VNTkaina.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">${shippingas.toFixed(2)}</p>`);
  // Nuolaida.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">-</p>`);

  // --- Price Column ---
  if (isEditable) {
    var shipInput = document.createElement('input');
    shipInput.type = 'number';
    shipInput.step = '0.01';
    shipInput.value = allItems.shippingPrice;
    shipInput.classList.add('edit-price'); // Use your existing CSS class

    shipInput.addEventListener('input', function (e) {
      allItems.shippingPrice = Number(e.target.value);
      RefreshUI(allItems); // Recalculate totals immediately
    });
    VNTkaina.appendChild(shipInput);
  } else {
    VNTkaina.insertAdjacentHTML('beforeend', "<p class=\"prekiu-listas\">".concat(allItems.shippingPrice.toFixed(2), "</p>"));
  }

  // Static columns
  Nuolaida.insertAdjacentHTML('beforeend', "<p class=\"prekiu-listas\">-</p>");

  // Sum Columns (These get updated by RefreshUI, but we need initial placeholders)
  var shipSumBe = document.createElement('p');
  shipSumBe.classList.add('prekiu-listas', 'shipping-sum-be'); // Added specific class for clearing
  shipSumBe.innerText = allItems.shippingPrice.toFixed(2);
  SumaBeNuolaidos.appendChild(shipSumBe);
  var shipSumSu = document.createElement('p');
  shipSumSu.classList.add('prekiu-listas', 'shipping-sum-su'); // Added specific class for clearing
  shipSumSu.innerText = allItems.shippingPrice.toFixed(2);
  SumaSuNuolaida.appendChild(shipSumSu);

  // SumaBeNuolaidos.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">${shippingas.toFixed(2)}</p>`);
  // SumaSuNuolaida.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">${shippingas.toFixed(2)}</p>`);
};

// -----------------------------------------------------------------------------------------------
// Spausdinti SUMAS

var GalutineSumaBePVM = document.querySelector('section.final-sum > div > p.galutinis-be-pvm');
var PVMsuma = document.querySelector('section.final-sum > div > p.pvm');
var GalutineSumaSuPVM = document.querySelector('section.final-sum > div > p.galutinis-su-pvm');
var PrintFinalTotals = function PrintFinalTotals(FinalTotals) {
  var TotalSumNoVATTag = document.createElement('span');
  TotalSumNoVATTag.innerText = FinalTotals.TotalSumNoVAT.toFixed(2);
  TotalSumNoVATTag.classList.add('total-sums');
  GalutineSumaBePVM.appendChild(TotalSumNoVATTag);
  var VATtag = document.createElement('span');
  VATtag.innerText = FinalTotals.VATvalue.toFixed(2);
  VATtag.classList.add('total-sums');
  PVMsuma.appendChild(VATtag);
  var TotalSumYesVATTag = document.createElement('span');
  TotalSumYesVATTag.innerText = FinalTotals.TotalSumWithVAT.toFixed(2);
  TotalSumYesVATTag.classList.add('total-sums');
  GalutineSumaSuPVM.appendChild(TotalSumYesVATTag);
};

// -----------------------------------------------------------------------------------------------
// Sąskaitos apmokėjimo terminas
var ApmoketiIki = document.querySelector('p.apmoketi-iki');
var PrintDueDate = function PrintDueDate(dueDateData) {
  var span = document.createElement('span');
  span.innerText = dueDateData.due_date;
  ApmoketiIki.appendChild(span);
};

// -----------------------------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
///////////////// =============== ČIA PRASIDEDA CRUD LOGIKA =============== /////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

// -----------------------------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ======= CREATE LOGIKA ======= ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

if (currentPage.includes('create.html') || currentPage.includes('view.html') || currentPage.includes('edit.html')) {
  // console.log('Kraunam naują sąsk. iš API...');

  // Check if we have an ID in the URL
  var urlParams = new URLSearchParams(window.location.search);
  // const invoiceId = urlParams.get('id');
  var viewId = urlParams.get('id');
  var editId = urlParams.get('edit');

  // if (invoiceId) {
  //     // VIEW MODE: Load from localStorage
  //     const data = InvoiceStorage.readLocalStorage(invoiceId);
  //     if (data) {
  //         console.log('Loading saved invoice:', data);
  //         renderInvoiceData(CalculatedRows, data); // We'll wrap your print functions in this

  //         // Hide the save button since it's already saved, 
  //         // or change it to an "Update" button later
  //         const saveButton = document.querySelector('#save-invoice');
  //         if (saveButton) saveButton.style.display = 'none';
  //     }

  if (viewId || editId) {
    // Find the data (Using read as the assumed method name)
    var id = viewId || editId;
    var data = InvoiceStorage.read(id);
    if (data) {
      renderInvoiceData(data);

      // Hide the "Update (New from API)" button
      var apiRefreshBtn = document.querySelector('#api-refresh');
      if (apiRefreshBtn) {
        apiRefreshBtn.style.display = 'none';
      }
      ;
      var saveButton = document.querySelector('#save-invoice');
      if (viewId) {
        // VIEW MODE: Just hide the button
        if (saveButton) saveButton.style.display = 'none';
      } else {
        if (editId) {
          if (saveButton) {
            saveButton.innerText = 'Update Invoice';
            saveButton.style.display = 'block';
            saveButton.addEventListener('click', function () {
              // <--- Start of function

              // 1. Check for invalid data
              var hasInvalidData = data.items.some(function (item) {
                var isPriceInvalid = item.price === '' || isNaN(item.price) || item.price < 0;
                var isQtyInvalid = item.quantity === '' || isNaN(item.quantity) || item.quantity < 0;
                var isDiscountInvalid = false;
                if (item.discount && item.discount.value < 0) {
                  isDiscountInvalid = true;
                }
                return isPriceInvalid || isQtyInvalid || isDiscountInvalid;
              });
              var isShippingInvalid = data.shippingPrice < 0;

              // 2. The IF block must be inside the listener so 'return' works
              if (hasInvalidData || isShippingInvalid) {
                alert('Įvesti klaidingi duomenys!');
                return; // This now correctly stops the function execution
              }

              // 3. Save if valid
              InvoiceStorage.Update(editId, data);
              alert('Sąskaita - faktūra atnaujinta!');
              window.location.href = 'list.html';
            }); // <--- End of function
          }
        }

        // // EDIT MODE: Change Save to Update
        // if (saveButton) {

        //     saveButton.innerText = 'Išsaugoti pakeitimus';
        //     saveButton.style.display = 'block'; // Ensure it's visible
        //     saveButton.addEventListener('click', _ => {
        //         // Use your Update method from OopCRUD
        //         // Here we pass the editId and the data object
        //         InvoiceStorage.Update(editId, data);
        //         alert('Sąskaita - Faktūra atnaujinta!');
        //         window.location.href = 'list.html';
        //     });
      }
    }
  } else {
    // CREATE MODE: Fetch from API
    fetch('https://in3.dev/inv/').then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log('Data from API:', data);
      renderInvoiceData(data);
      var saveButton = document.querySelector('#save-invoice');
      if (saveButton) {
        saveButton.addEventListener('click', function (_) {
          InvoiceStorage.Store(data);
          alert('Sąskaita - Faktūra išsaugota!');
          window.location.href = 'list.html';
        });
      }
    });
  }
}
;

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// ======= VISŲ INVOICE'Ų LIST LOGIKA ======= /////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

if (currentPage.includes('list.html')) {
  var listBin = document.querySelector('#invoice-list-bin');
  if (InvoiceStorage.list.length === 0) {
    listBin.innerHTML = '<p>Sąrašas yra tuščias.</p>';
  } else {
    // Create a simple table or list
    var html = "\n            <table border=\"1\" style=\"width:100%; border-collapse: collapse; margin-top: 20px;\">\n                <thead>\n                    <tr>\n                        <th>S\u0105skaitos nr.</th>\n                        <th>S\u0105skaitos data</th>\n                        <th>Suma su PVM, EUR</th>\n                        <th class=\"special-th\">Pasirinkite veiksm\u0105</th>\n                    </tr>\n                </thead>\n                <tbody>\n        ";
    InvoiceStorage.list.forEach(function (inv) {
      // We need the total sum for the list. 
      // We can reuse your logic!
      var rows = inv.items.map(function (item) {
        return CalculateRowSums(item);
      });
      var totals = CalculateTotalSums(rows, inv.shippingPrice);
      html += "\n                <tr>\n                    <td>".concat(inv.number, "</td>\n                    <td>").concat(inv.date, "</td>\n                    <td>").concat(totals.TotalSumWithVAT.toFixed(2), " EUR</td>\n                    <td class=\"buttons-td\">\n                        <div>\n                            <button class=\"view-btn\" data-id=\"").concat(inv.id, "\">Per\u017Ei\u016Br\u0117ti</button>\n                            <button class=\"edit-btn\" data-id=\"").concat(inv.id, "\">Redaguoti</button>\n                            <button class=\"delete-btn\" data-id=\"").concat(inv.id, "\">Delete</button>\n                        </div>\n                    </td>\n                </tr>\n            ");
    });
    html += "</tbody></table>";
    listBin.innerHTML = html;

    // Add event listeners for Edit buttons
    document.querySelectorAll('.edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var id = e.target.dataset.id;
        window.location.href = "edit.html?edit=".concat(id); // Note the ?edit=
      });
    });

    // Add event listeners for View buttons
    document.querySelectorAll('.view-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var id = e.target.dataset.id;
        window.location.href = "view.html?id=".concat(id);
      });
    });

    // Add event listeners for Delete buttons
    document.querySelectorAll('.delete-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (confirm('Ar tikrai norite ištrinti šią sąskaitą - faktūrą?')) {
          var _id = e.target.dataset.id;
          InvoiceStorage.Destroy(_id);
          window.location.reload(); // Refresh the list
        }
      });
    });
  }
}

// If user lands on index.html or the root folder, send them to the list
if (currentPage.endsWith('/') || currentPage.includes('index.html')) {
  window.location.href = 'list.html';
}

// -----------------------------------------------------------------------------------------------
// CLASSIFIED

var bodis = document.querySelector('body');
var divas = document.querySelector('div.sask-date-div');
var DangerButton = document.querySelector('div.sask-div > div.sask-nr-div > button.bebras-button');
var SecretWeapon = function SecretWeapon(e) {
  e.target.disabled = true;
  var newButton = document.createElement('button');
  newButton.innerText = "Are you sure? THERE'S NO GOING BACK";
  newButton.classList.add('bebras-button2');
  divas.appendChild(newButton);
  newButton.addEventListener('click', function (_) {
    document.body.innerHTML = '';
    var sekcija = document.createElement('section');
    sekcija.classList.add('bebras-section');
    bodis.appendChild(sekcija);
    var BebroIMG = document.createElement('img');
    BebroIMG.src = '../images/bebras.png';
    BebroIMG.alt = 'Bebras';
    BebroIMG.classList.add('bebras-img');
    sekcija.appendChild(BebroIMG);
    var p1 = document.createElement('p');
    p1.innerText = 'Bebras viską sugraužė!';
    p1.classList.add('bebras-say');
    sekcija.appendChild(p1);
    var p2 = document.createElement('p');
    p2.innerText = 'Have a nice day!';
    p2.classList.add('bebras-say2');
    sekcija.appendChild(p2);
    var AtstatomKnopke = document.createElement('button');
    AtstatomKnopke.innerText = 'Atstatom';
    AtstatomKnopke.classList.add('fix');
    sekcija.appendChild(AtstatomKnopke);
    AtstatomKnopke.addEventListener('click', function (_) {
      window.location.href = window.location.href = '';
    });
  });
};
if (currentPage.includes('create.html') || currentPage.includes('view.html') || currentPage.includes('edit.html')) {
  DangerButton.addEventListener('click', SecretWeapon);
}
;

// -----------------------------------------------------------------------------------------------

// fetch('mock.json')
// fetch('https://in3.dev/inv/')
//     .then(res => res.json())
//     .then(data => {

//         PrintInvoiceNrAndDate(data);
//         PrintBuyerData(data);
//         PrintSellerData(data);
//         PrintRowNumberAndItemName(data);
//         PrintQuantity(data);
//         PrintUnitPrice(data);
//         const CalculatedRows = data.items.map(item => CalculateRowSums(item));
//         PrintCalculatedDiscountColumn(CalculatedRows);
//         PrintSumsWithoutDiscount(CalculatedRows);
//         PrintSumsWithDiscount(CalculatedRows);
//         // CalculateTotalSums(CalculatedRows);
//         PridedamShipping(data);
//         const FinalTotals = CalculateTotalSums(CalculatedRows, data.shippingPrice);
//         PrintFinalTotals(FinalTotals);
//         PrintDueDate(data);

//         console.log(CalculatedRows);
//         console.log(data);
//     });

// -----------------------------------------------------------------------------------------------

var RefreshUI = function RefreshUI(data) {
  var _GalutineSumaBePVM$qu, _PVMsuma$querySelecto, _GalutineSumaSuPVM$qu;
  var activeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // 1. Clear the old numbers from the screen so they don't stack
  Nuolaida.innerHTML = '<h4>VNT Nuolaida,<br>EUR</h4>';
  SumaBeNuolaidos.innerHTML = '<h4>Suma be nuolaidos<br> be PVM,<br> EUR</h4>';
  SumaSuNuolaida.innerHTML = '<h4>Suma su nuolaida<br> be PVM,<br> EUR</h4>';

  // 2. Clear the old Shipping labels from the static columns
  // (We use a specific selector to remove the <p> and <input> tags we added manually)
  EilesNr.querySelectorAll('.shipping-row').forEach(function (el) {
    return el.remove();
  });
  PrekesPavadinimas.querySelectorAll('.shipping-row').forEach(function (el) {
    return el.remove();
  });
  Kiekis.querySelectorAll('.shipping-row').forEach(function (el) {
    return el.remove();
  });
  VNTkaina.querySelectorAll('.shipping-row').forEach(function (el) {
    return el.remove();
  });

  // Clear the spans inside the final total paragraphs
  (_GalutineSumaBePVM$qu = GalutineSumaBePVM.querySelector('span')) === null || _GalutineSumaBePVM$qu === void 0 || _GalutineSumaBePVM$qu.remove();
  (_PVMsuma$querySelecto = PVMsuma.querySelector('span')) === null || _PVMsuma$querySelecto === void 0 || _PVMsuma$querySelecto.remove();
  (_GalutineSumaSuPVM$qu = GalutineSumaSuPVM.querySelector('span')) === null || _GalutineSumaSuPVM$qu === void 0 || _GalutineSumaSuPVM$qu.remove();

  // Clear shipping rows specifically so they don't duplicate
  document.querySelectorAll('.shipping-sum-be, .shipping-sum-su').forEach(function (el) {
    return el.remove();
  });

  // 2. Re-calculate based on the new quantities
  var CalculatedRows = data.items.map(function (item) {
    return CalculateRowSums(item);
  });

  // 3. Re-print the updated numbers
  PrintCalculatedDiscountColumn(CalculatedRows, data, activeIndex);
  PrintSumsWithoutDiscount(CalculatedRows);
  PrintSumsWithDiscount(CalculatedRows);

  // 5. FIX: Re-run the Shipping logic so it reappears at the bottom
  // PridedamShipping(data);

  // 4. Re-print the Shipping Sums at the very bottom of the columns
  SumaBeNuolaidos.insertAdjacentHTML('beforeend', "<p class=\"prekiu-listas\">".concat(data.shippingPrice.toFixed(2), "</p>"));
  SumaSuNuolaida.insertAdjacentHTML('beforeend', "<p class=\"prekiu-listas\">".concat(data.shippingPrice.toFixed(2), "</p>"));
  Nuolaida.insertAdjacentHTML('beforeend', "<p class=\"prekiu-listas\">-</p>");

  // 5. Update Final Totals
  var FinalTotals = CalculateTotalSums(CalculatedRows, data.shippingPrice);
  PrintFinalTotals(FinalTotals);

  // Update shipping sum displays if they exist as tags
  var shipBe = document.querySelector('.shipping-sum-be');
  if (shipBe) shipBe.innerText = data.shippingPrice.toFixed(2);
};

// -----------------------------------------------------------------------------------------------

// Helper function to keep code clean
function renderInvoiceData(data) {
  PrintInvoiceNrAndDate(data);
  PrintBuyerData(data);
  PrintSellerData(data);
  PrintRowNumberAndItemName(data);
  PrintQuantity(data);
  PrintUnitPrice(data);
  var CalculatedRows = data.items.map(function (item) {
    return CalculateRowSums(item);
  });
  PrintCalculatedDiscountColumn(CalculatedRows, data);
  PrintSumsWithoutDiscount(CalculatedRows);
  PrintSumsWithDiscount(CalculatedRows);
  // CalculateTotalSums(CalculatedRows);
  PridedamShipping(data);
  var FinalTotals = CalculateTotalSums(CalculatedRows, data.shippingPrice);
  PrintFinalTotals(FinalTotals);
  PrintDueDate(data);
  console.log(CalculatedRows);
}

/***/ },

/***/ "./src/crud-code.js"
/*!**************************!*\
  !*** ./src/crud-code.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/v4.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


// Programavo Marytė - Nelyst prie kodo - kodas UNIVERSALUS CRUD
var OopCrud = /*#__PURE__*/_createClass(function OopCrud(key) {
  var _this = this;
  _classCallCheck(this, OopCrud);
  _defineProperty(this, "read", function (id) {
    return _this.list.find(function (item) {
      return item.id == id;
    });
  });
  _defineProperty(this, "readLocalStorage", function (_) {
    var data = localStorage.getItem(_this.key);

    // ALTERNATYVA su ternary metodu
    // null === data ? this.list = [] : this.list = JSON.parse(data);

    if (null === data) {
      _this.list = [];
    } else {
      _this.list = JSON.parse(data);
    }
  });
  _defineProperty(this, "writeLocalStorage", function (_) {
    // let data = JSON.stringify(this.list);
    // localStorage.setItem(this.key, data);
    localStorage.setItem(_this.key, JSON.stringify(_this.list));
  });
  _defineProperty(this, "Store", function (data) {
    var id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var dataToStore = _objectSpread(_objectSpread({}, data), {}, {
      id: id
    });
    _this.list.unshift(dataToStore);
    _this.writeLocalStorage();
    return dataToStore;
  });
  _defineProperty(this, "Destroy", function (id) {
    _this.list = _this.list.filter(function (item) {
      return item.id != id;
    });
    _this.writeLocalStorage();
  });
  _defineProperty(this, "Update", function (id, data) {
    _this.list = _this.list.map(function (item) {
      return item.id == id ? _objectSpread(_objectSpread(_objectSpread({}, item), data), {}, {
        id: id
      }) : item;
    });
    _this.writeLocalStorage();
  });
  this.key = key;
  this.readLocalStorage();
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OopCrud); // eksportuojam failą Ls.js

/***/ },

/***/ "./src/style.scss"
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/public/app": 0,
/******/ 			"public/style": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkinvoices_crud"] = self["webpackChunkinvoices_crud"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/style"], () => (__webpack_require__("./src/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/style"], () => (__webpack_require__("./src/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;