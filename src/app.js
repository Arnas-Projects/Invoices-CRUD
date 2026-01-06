

// -----------------------------------------------------------------------------------------------
// Sąskaitos nr ir data
const SaskaitosNr = document.querySelector('div.sask-nr-div > p');
const SaskaitosData = document.querySelector('div.sask-date-div > p');


const PrintInvoiceNrAndDate = NrAndDate => {

    const InvoiceNrTag = document.createElement('span');
    // NrAndDate.number;
    InvoiceNrTag.innerText = NrAndDate.number;
    InvoiceNrTag.classList.add('sask-nr');
    SaskaitosNr.appendChild(InvoiceNrTag);

    const InvoiceDateTag = document.createElement('span');
    // NrAndDate.date;
    InvoiceDateTag.innerText = NrAndDate.date;
    InvoiceDateTag.classList.add('sask-data');
    SaskaitosData.appendChild(InvoiceDateTag);
};


// -----------------------------------------------------------------------------------------------
// Pirkėjo duomenys

const Pirkejas = document.querySelectorAll('section.buyer-seller > div.buyer > p');


const PrintBuyerData = BuyerData => {

    const CompanyNameTag = document.createElement('span');
    CompanyNameTag.innerText = BuyerData.company.buyer.name;
    CompanyNameTag.classList.add('buyer-span');
    Pirkejas[0].appendChild(CompanyNameTag);

    const CompanyAddress = document.createElement('span');
    CompanyAddress.innerText = BuyerData.company.buyer.address;
    CompanyAddress.classList.add('buyer-span');
    Pirkejas[1].appendChild(CompanyAddress);

    const CompanyCode = document.createElement('span');
    CompanyCode.innerText = BuyerData.company.buyer.code;
    CompanyCode.classList.add('buyer-span');
    Pirkejas[2].appendChild(CompanyCode);

    const CompanyVATnumber = document.createElement('span');
    CompanyVATnumber.innerText = BuyerData.company.buyer.vat;
    CompanyVATnumber.classList.add('buyer-span');
    Pirkejas[3].appendChild(CompanyVATnumber);

    const CompanyMobileNumber = document.createElement('span');
    CompanyMobileNumber.innerText = BuyerData.company.buyer.phone;
    CompanyMobileNumber.classList.add('buyer-span');
    Pirkejas[4].appendChild(CompanyMobileNumber);

    const CompanyEmail = document.createElement('span');
    CompanyEmail.innerText = BuyerData.company.buyer.email;
    CompanyEmail.classList.add('buyer-span');
    Pirkejas[5].appendChild(CompanyEmail);
};


// -----------------------------------------------------------------------------------------------
// Pardavėjo duomenys

const Pardavejas = document.querySelectorAll('section.buyer-seller > div.seller > p');


const PrintSellerData = SellerData => {

    const CompanyNameTag = document.createElement('span');
    CompanyNameTag.innerText = SellerData.company.seller.name;
    CompanyNameTag.classList.add('seller-span');
    Pardavejas[0].appendChild(CompanyNameTag);

    const CompanyAddress = document.createElement('span');
    CompanyAddress.innerText = SellerData.company.seller.address;
    CompanyAddress.classList.add('seller-span');
    Pardavejas[1].appendChild(CompanyAddress);

    const CompanyCode = document.createElement('span');
    CompanyCode.innerText = SellerData.company.seller.code;
    CompanyCode.classList.add('seller-span');
    Pardavejas[2].appendChild(CompanyCode);

    const CompanyVATnumber = document.createElement('span');
    CompanyVATnumber.innerText = SellerData.company.seller.vat;
    CompanyVATnumber.classList.add('seller-span');
    Pardavejas[3].appendChild(CompanyVATnumber);

    const CompanyMobileNumber = document.createElement('span');
    CompanyMobileNumber.innerText = SellerData.company.seller.phone;
    CompanyMobileNumber.classList.add('seller-span');
    Pardavejas[4].appendChild(CompanyMobileNumber);

    const CompanyEmail = document.createElement('span');
    CompanyEmail.innerText = SellerData.company.seller.email;
    CompanyEmail.classList.add('seller-span');
    Pardavejas[5].appendChild(CompanyEmail);
};



// -----------------------------------------------------------------------------------------------
// Eilės nr.  ir  Prekių pavadinimai

const EilesNr = document.querySelector('section.products-list > div.eilesNr');
const PrekesPavadinimas = document.querySelector('section.products-list > div.preke');


const PrintRowNumberAndItemName = allItems => {

    allItems.items.forEach((oneItem, index) => {

        const IndexTag = document.createElement('p');
        IndexTag.innerText = (index + 1) + '.';
        IndexTag.classList.add('eiles-numeris');
        EilesNr.appendChild(IndexTag);

        const ItemNameTag = document.createElement('p');
        ItemNameTag.innerText = oneItem.description;
        ItemNameTag.classList.add('prekiu-listas');
        PrekesPavadinimas.appendChild(ItemNameTag);
    });
};


// -----------------------------------------------------------------------------------------------
// Prekių kiekis

const Kiekis = document.querySelector('section.products-list > div.kiekis');

const PrintQuantity = allItems => {

    allItems.items.forEach(oneItem => {

        const QuantityTag = document.createElement('p');
        QuantityTag.innerText = oneItem.quantity;
        QuantityTag.classList.add('prekiu-listas');
        Kiekis.appendChild(QuantityTag);
    });
}


// -----------------------------------------------------------------------------------------------
// Vieneto kaina

const VNTkaina = document.querySelector('section.products-list > div.vnt-kaina');

const PrintUnitPrice = allItems => {

    allItems.items.forEach(oneItem => {

        const UnitPriceTag = document.createElement('p');
        const PriceWithDecimal = oneItem.price.toFixed(2);
        UnitPriceTag.innerText = PriceWithDecimal;
        UnitPriceTag.classList.add('prekiu-listas');
        VNTkaina.appendChild(UnitPriceTag);
    });
};



// -----------------------------------------------------------------------------------------------
// Skaičiuoti SU NUOLAIDA ir BE NUOLAIDOS, tik logika,
// kurią vėliau pritaikysiu masyvui. 
// Čia be skaičių (kadangi nėr masyvo, nėr ir forEach);




const CalculateRowSums = item => {

    const Quantity = item.quantity;
    const ItemPrice = item.price;
    const RowSumWithoutDiscount = Quantity * ItemPrice;

    let DiscountAmount = 0;
    let SingleUnitDiscountText = '';

    if (item.discount && item.discount.type == 'fixed') {
        DiscountAmount = item.discount.value;
        SingleUnitDiscountText = `Fiksuota. -${(DiscountAmount).toFixed(2)}`;
    } else if (item.discount && item.discount.type == 'percentage') {
        DiscountAmount = ItemPrice * (item.discount.value / 100);
        SingleUnitDiscountText = `-${item.discount.value}% (-${(DiscountAmount).toFixed(2)})`;
    } else {
        SingleUnitDiscountText = `-`;
    }

    const AllItemsDiscountAmount = DiscountAmount * Quantity;
    const RowSumWithDiscount = RowSumWithoutDiscount - AllItemsDiscountAmount;


    return {
        Quantity,
        ItemPrice,
        RowSumWithoutDiscount,
        DiscountAmount,
        SingleUnitDiscountText,
        RowSumWithDiscount,
        AllItemsDiscountAmount
    };
};


// -----------------------------------------------------------------------------------------------
// Spausdinti suskaičiuotas VNT NUOLAIDOS reikšmes 
// iš naujo .map masyvo vardu 'CalculatedRows'


const Nuolaida = document.querySelector('section.products-list > div.nuolaida');


const PrintCalculatedDiscountColumn = CalculatedRows => {

    CalculatedRows.forEach(oneSingleItem => {

        const DiscountTag = document.createElement('p');
        DiscountTag.innerText = oneSingleItem.SingleUnitDiscountText;
        DiscountTag.classList.add('prekiu-listas');
        Nuolaida.appendChild(DiscountTag);
    });
};



// -----------------------------------------------------------------------------------------------
// Spausdinti suskaičiuotas SUMA BE NUOLAIDOS IR BE PVM reikšmes 
// iš naujo .map masyvo vardu 'CalculatedRows'

const SumaBeNuolaidos = document.querySelector('section.products-list > div.suma-be-nuolaidos');


const PrintSumsWithoutDiscount = CalculatedRows => {

    CalculatedRows.forEach(oneSingleItem => {

        const SumNoDiscountTag = document.createElement('p');
        SumNoDiscountTag.innerText = (oneSingleItem.RowSumWithoutDiscount).toFixed(2);
        SumNoDiscountTag.classList.add('prekiu-listas');
        SumaBeNuolaidos.appendChild(SumNoDiscountTag);
    });
};



// -----------------------------------------------------------------------------------------------
// Spausdinti suskaičiuotas SUMA SU NUOLAIDA IR BE PVM reikšmes 
// iš naujo .map masyvo vardu 'CalculatedRows'

const SumaSuNuolaida = document.querySelector('section.products-list > div.suma-su-nuolaida');


const PrintSumsWithDiscount = CalculatedRows => {

    CalculatedRows.forEach(oneSingleItem => {

        const SumYesDiscountTag = document.createElement('p');
        SumYesDiscountTag.innerText = (oneSingleItem.RowSumWithDiscount).toFixed(2);
        SumYesDiscountTag.classList.add('prekiu-listas');
        SumaSuNuolaida.appendChild(SumYesDiscountTag);
    });
};


// -----------------------------------------------------------------------------------------------
// Skaičiuoti TOTAL SUMOS, tik logika,
// kurią vėliau pritaikysiu masyvui. 
// Čia be skaičių (kadangi nėr masyvo, nėr ir forEach);


const CalculateTotalSums = (CalculatedRows, shippingPrice = 0) => {

    const ItemsTotalNoVAT = CalculatedRows.reduce((SumOfAllRows, SingleRowSum) =>
        SumOfAllRows + SingleRowSum.RowSumWithDiscount, 0);

    const TotalSumNoVAT = ItemsTotalNoVAT + shippingPrice;
    const VATvalue = TotalSumNoVAT * 0.21;
    const TotalSumWithVAT = TotalSumNoVAT + VATvalue;

    return {
        TotalSumNoVAT,
        VATvalue,
        TotalSumWithVAT
    }
};



// -----------------------------------------------------------------------------------------------
// Shippingas


const PridedamShipping = allItems => {
    const shippingas = allItems.shippingPrice;
    const shippingRowNumber = allItems.items.length + 1;


    EilesNr.insertAdjacentHTML('beforeend', `<p>${shippingRowNumber}.</p>`);
    PrekesPavadinimas.insertAdjacentHTML('beforeend', `<p>Transportavimo išlaidos</p>`);
    Kiekis.insertAdjacentHTML('beforeend', `<p>1</p>`);
    VNTkaina.insertAdjacentHTML('beforeend', `<p>${shippingas.toFixed(2)}</p>`);
    Nuolaida.insertAdjacentHTML('beforeend', `<p>-</p>`);

    SumaBeNuolaidos.insertAdjacentHTML('beforeend', `<p>${shippingas.toFixed(2)}</p>`);
    SumaSuNuolaida.insertAdjacentHTML('beforeend', `<p>${shippingas.toFixed(2)}</p>`);
};



// -----------------------------------------------------------------------------------------------
// Spausdinti SUMAS


const GalutineSumaBePVM = document.querySelector('section.final-sum > div > p.galutinis-be-pvm');
const PVMsuma = document.querySelector('section.final-sum > div > p.pvm');
const GalutineSumaSuPVM = document.querySelector('section.final-sum > div > p.galutinis-su-pvm');


const PrintFinalTotals = FinalTotals => {

    const TotalSumNoVATTag = document.createElement('span');
    TotalSumNoVATTag.innerText = (FinalTotals.TotalSumNoVAT).toFixed(2);
    TotalSumNoVATTag.classList.add('total-sums');
    GalutineSumaBePVM.appendChild(TotalSumNoVATTag);

    const VATtag = document.createElement('span');
    VATtag.innerText = (FinalTotals.VATvalue).toFixed(2);
    VATtag.classList.add('total-sums');
    PVMsuma.appendChild(VATtag);

    const TotalSumYesVATTag = document.createElement('span');
    TotalSumYesVATTag.innerText = (FinalTotals.TotalSumWithVAT).toFixed(2);
    TotalSumYesVATTag.classList.add('total-sums');
    GalutineSumaSuPVM.appendChild(TotalSumYesVATTag);
};



// -----------------------------------------------------------------------------------------------
// Sąskaitos apmokėjimo terminas
const ApmoketiIki = document.querySelector('p.apmoketi-iki');


const PrintDueDate = dueDateData => {

    const span = document.createElement('span');
    span.innerText = dueDateData.due_date;
    ApmoketiIki.appendChild(span);
};



// -----------------------------------------------------------------------------------------------

// fetch('mock.json')
fetch('https://in3.dev/inv/')
    .then(res => res.json())
    .then(data => {

        PrintInvoiceNrAndDate(data);
        PrintBuyerData(data);
        PrintSellerData(data);
        PrintRowNumberAndItemName(data);
        PrintQuantity(data);
        PrintUnitPrice(data);
        const CalculatedRows = data.items.map(item => CalculateRowSums(item));
        PrintCalculatedDiscountColumn(CalculatedRows);
        PrintSumsWithoutDiscount(CalculatedRows);
        PrintSumsWithDiscount(CalculatedRows);
        // CalculateTotalSums(CalculatedRows);
        PridedamShipping(data);
        const FinalTotals = CalculateTotalSums(CalculatedRows, data.shippingPrice);
        PrintFinalTotals(FinalTotals);
        PrintDueDate(data);

        console.log(CalculatedRows);
        console.log(data);
    });

// -----------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------
// CLASSIFIED

const bodis = document.querySelector('body');
const divas = document.querySelector('div.sask-date-div');
const DangerButton = document.querySelector('div.sask-div > div.sask-nr-div > button.bebras-button');


const SecretWeapon = e => {

    e.target.disabled = true;

    const newButton = document.createElement('button');
    newButton.innerText = "Are you sure? THERE'S NO GOING BACK";
    newButton.classList.add('bebras-button2');
    divas.appendChild(newButton);


    newButton.addEventListener('click', _ => {

        document.body.innerHTML = '';

        const sekcija = document.createElement('section');
        sekcija.classList.add('bebras-section');
        bodis.appendChild(sekcija);

        const BebroIMG = document.createElement('img');
        BebroIMG.src ='images/bebras.png';
        BebroIMG.alt = 'Bebras';
        BebroIMG.classList.add('bebras-img');
        sekcija.appendChild(BebroIMG);

        const p1 = document.createElement('p');
        p1.innerText = 'Bebras viską sugraužė!';
        p1.classList.add('bebras-say');
        sekcija.appendChild(p1);

        const p2 = document.createElement('p');
        p2.innerText = 'Have a nice day!';
        p2.classList.add('bebras-say2');
        sekcija.appendChild(p2);

        const AtstatomKnopke = document.createElement('button');
        AtstatomKnopke.innerText = 'Atstatom';
        AtstatomKnopke.classList.add('fix');
        sekcija.appendChild(AtstatomKnopke);

        AtstatomKnopke.addEventListener('click', _ => {
            window.location.href = 'http://localhost:5500/homework/invoice/index.html';
        });
    })
};

DangerButton.addEventListener('click', SecretWeapon);




