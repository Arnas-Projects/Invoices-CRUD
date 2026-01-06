/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js"
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
() {

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
  var CompanyNameTag = document.createElement('span');
  CompanyNameTag.innerText = BuyerData.company.buyer.name;
  CompanyNameTag.classList.add('buyer-span');
  Pirkejas[0].appendChild(CompanyNameTag);
  var CompanyAddress = document.createElement('span');
  CompanyAddress.innerText = BuyerData.company.buyer.address;
  CompanyAddress.classList.add('buyer-span');
  Pirkejas[1].appendChild(CompanyAddress);
  var CompanyCode = document.createElement('span');
  CompanyCode.innerText = BuyerData.company.buyer.code;
  CompanyCode.classList.add('buyer-span');
  Pirkejas[2].appendChild(CompanyCode);
  var CompanyVATnumber = document.createElement('span');
  CompanyVATnumber.innerText = BuyerData.company.buyer.vat;
  CompanyVATnumber.classList.add('buyer-span');
  Pirkejas[3].appendChild(CompanyVATnumber);
  var CompanyMobileNumber = document.createElement('span');
  CompanyMobileNumber.innerText = BuyerData.company.buyer.phone;
  CompanyMobileNumber.classList.add('buyer-span');
  Pirkejas[4].appendChild(CompanyMobileNumber);
  var CompanyEmail = document.createElement('span');
  CompanyEmail.innerText = BuyerData.company.buyer.email;
  CompanyEmail.classList.add('buyer-span');
  Pirkejas[5].appendChild(CompanyEmail);
};

// -----------------------------------------------------------------------------------------------
// Pardavėjo duomenys

var Pardavejas = document.querySelectorAll('section.buyer-seller > div.seller > p');
var PrintSellerData = function PrintSellerData(SellerData) {
  var CompanyNameTag = document.createElement('span');
  CompanyNameTag.innerText = SellerData.company.seller.name;
  CompanyNameTag.classList.add('seller-span');
  Pardavejas[0].appendChild(CompanyNameTag);
  var CompanyAddress = document.createElement('span');
  CompanyAddress.innerText = SellerData.company.seller.address;
  CompanyAddress.classList.add('seller-span');
  Pardavejas[1].appendChild(CompanyAddress);
  var CompanyCode = document.createElement('span');
  CompanyCode.innerText = SellerData.company.seller.code;
  CompanyCode.classList.add('seller-span');
  Pardavejas[2].appendChild(CompanyCode);
  var CompanyVATnumber = document.createElement('span');
  CompanyVATnumber.innerText = SellerData.company.seller.vat;
  CompanyVATnumber.classList.add('seller-span');
  Pardavejas[3].appendChild(CompanyVATnumber);
  var CompanyMobileNumber = document.createElement('span');
  CompanyMobileNumber.innerText = SellerData.company.seller.phone;
  CompanyMobileNumber.classList.add('seller-span');
  Pardavejas[4].appendChild(CompanyMobileNumber);
  var CompanyEmail = document.createElement('span');
  CompanyEmail.innerText = SellerData.company.seller.email;
  CompanyEmail.classList.add('seller-span');
  Pardavejas[5].appendChild(CompanyEmail);
};

// -----------------------------------------------------------------------------------------------
// Eilės nr.  ir  Prekių pavadinimai

var EilesNr = document.querySelector('section.products-list > div.eilesNr');
var PrekesPavadinimas = document.querySelector('section.products-list > div.preke');
var PrintRowNumberAndItemName = function PrintRowNumberAndItemName(allItems) {
  allItems.items.forEach(function (oneItem, index) {
    var IndexTag = document.createElement('p');
    IndexTag.innerText = index + 1 + '.';
    IndexTag.classList.add('eiles-numeris');
    EilesNr.appendChild(IndexTag);
    var ItemNameTag = document.createElement('p');
    ItemNameTag.innerText = oneItem.description;
    ItemNameTag.classList.add('prekiu-listas');
    PrekesPavadinimas.appendChild(ItemNameTag);
  });
};

// -----------------------------------------------------------------------------------------------
// Prekių kiekis

var Kiekis = document.querySelector('section.products-list > div.kiekis');
var PrintQuantity = function PrintQuantity(allItems) {
  allItems.items.forEach(function (oneItem) {
    var QuantityTag = document.createElement('p');
    QuantityTag.innerText = oneItem.quantity;
    QuantityTag.classList.add('prekiu-listas');
    Kiekis.appendChild(QuantityTag);
  });
};

// -----------------------------------------------------------------------------------------------
// Vieneto kaina

var VNTkaina = document.querySelector('section.products-list > div.vnt-kaina');
var PrintUnitPrice = function PrintUnitPrice(allItems) {
  allItems.items.forEach(function (oneItem) {
    var UnitPriceTag = document.createElement('p');
    var PriceWithDecimal = oneItem.price.toFixed(2);
    UnitPriceTag.innerText = PriceWithDecimal;
    UnitPriceTag.classList.add('prekiu-listas');
    VNTkaina.appendChild(UnitPriceTag);
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
var PrintCalculatedDiscountColumn = function PrintCalculatedDiscountColumn(CalculatedRows) {
  CalculatedRows.forEach(function (oneSingleItem) {
    var DiscountTag = document.createElement('p');
    DiscountTag.innerText = oneSingleItem.SingleUnitDiscountText;
    DiscountTag.classList.add('prekiu-listas');
    Nuolaida.appendChild(DiscountTag);
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
  var shippingas = allItems.shippingPrice;
  var shippingRowNumber = allItems.items.length + 1;
  EilesNr.insertAdjacentHTML('beforeend', "<p>".concat(shippingRowNumber, ".</p>"));
  PrekesPavadinimas.insertAdjacentHTML('beforeend', "<p>Transportavimo i\u0161laidos</p>");
  Kiekis.insertAdjacentHTML('beforeend', "<p>1</p>");
  VNTkaina.insertAdjacentHTML('beforeend', "<p>".concat(shippingas.toFixed(2), "</p>"));
  Nuolaida.insertAdjacentHTML('beforeend', "<p>-</p>");
  SumaBeNuolaidos.insertAdjacentHTML('beforeend', "<p>".concat(shippingas.toFixed(2), "</p>"));
  SumaSuNuolaida.insertAdjacentHTML('beforeend', "<p>".concat(shippingas.toFixed(2), "</p>"));
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

// fetch('mock.json')
fetch('https://in3.dev/inv/').then(function (res) {
  return res.json();
}).then(function (data) {
  PrintInvoiceNrAndDate(data);
  PrintBuyerData(data);
  PrintSellerData(data);
  PrintRowNumberAndItemName(data);
  PrintQuantity(data);
  PrintUnitPrice(data);
  var CalculatedRows = data.items.map(function (item) {
    return CalculateRowSums(item);
  });
  PrintCalculatedDiscountColumn(CalculatedRows);
  PrintSumsWithoutDiscount(CalculatedRows);
  PrintSumsWithDiscount(CalculatedRows);
  // CalculateTotalSums(CalculatedRows);
  PridedamShipping(data);
  var FinalTotals = CalculateTotalSums(CalculatedRows, data.shippingPrice);
  PrintFinalTotals(FinalTotals);
  PrintDueDate(data);
  console.log(CalculatedRows);
  console.log(data);
});

// -----------------------------------------------------------------------------------------------

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
    BebroIMG.src = 'images/bebras.png';
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
      window.location.href = 'http://localhost:5500/homework/invoice/index.html';
    });
  });
};
DangerButton.addEventListener('click', SecretWeapon);

/***/ },

/***/ "./src/style.scss"
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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