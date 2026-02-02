import OopCRUD from './crud-code.js';

const InvoiceStorage = new OopCRUD('my_invoices');

const currentPage = window.location.pathname;


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

    // Determine if we are in a mode that allows editing
    const isEditable = currentPage.includes('edit.html') && !window.location.search.includes('id=');

    const fields = [
        { value: BuyerData.company.buyer.name },
        { value: BuyerData.company.buyer.address },
        { value: BuyerData.company.buyer.code },
        { value: BuyerData.company.buyer.vat },
        { value: BuyerData.company.buyer.phone },
        { value: BuyerData.company.buyer.email }
    ];

    fields.forEach((field, index) => {
        let tag;
        if (isEditable) {
            tag = document.createElement('input');
            tag.value = field.value;
            tag.classList.add('buyer-input'); // We can style this in CSS

            // Step A.2: Sync changes back to the data object
            tag.addEventListener('input', e => {
                const keys = ['name', 'address', 'code', 'vat', 'phone', 'email'];
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

const Pardavejas = document.querySelectorAll('section.buyer-seller > div.seller > p');


const PrintSellerData = SellerData => {

    // Determine if we are in a mode that allows editing
    const isEditable = currentPage.includes('edit.html') && !window.location.search.includes('id=');

    const fields = [
        { value: SellerData.company.seller.name },
        { value: SellerData.company.seller.address },
        { value: SellerData.company.seller.code },
        { value: SellerData.company.seller.vat },
        { value: SellerData.company.seller.phone },
        { value: SellerData.company.seller.email }
    ];

    fields.forEach((field, index) => {
        let tag;
        if (isEditable) {
            tag = document.createElement('input');
            tag.value = field.value;
            tag.classList.add('buyer-input'); // We can style this in CSS

            // Step A.2: Sync changes back to the data object
            tag.addEventListener('input', e => {
                const keys = ['name', 'address', 'code', 'vat', 'phone', 'email'];
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

const EilesNr = document.querySelector('section.products-list > div.eilesNr');
const PrekesPavadinimas = document.querySelector('section.products-list > div.preke');


const PrintRowNumberAndItemName = allItems => {

    const isEditable = currentPage.includes('edit.html');

    allItems.items.forEach((oneItem, index) => {

        const IndexTag = document.createElement('p');
        IndexTag.innerText = (index + 1) + '.';
        IndexTag.classList.add('prekes-listas');
        EilesNr.appendChild(IndexTag);

        // --- EDITABLE NAME ---
        const tag = isEditable ? document.createElement('input') : document.createElement('p');

        if (isEditable) {
            tag.value = oneItem.description;
            tag.classList.add('edit-name'); // You can style this in SCSS later
            tag.addEventListener('input', e => {
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

const Kiekis = document.querySelector('section.products-list > div.kiekis');

const PrintQuantity = allItems => {

    const isEditable = currentPage.includes('edit.html'); // && !window.location.search.includes('id=');

    allItems.items.forEach(oneItem => {

        const tag = isEditable ? document.createElement('input') : document.createElement('p');

        if (isEditable) {
            tag.type = 'number';
            tag.value = oneItem.quantity;
            tag.classList.add('edit-qty');

            // --- THE NEW PART ---
            // Whenever the user types, update the object and refresh the screen
            tag.addEventListener('input', e => {
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
}


// -----------------------------------------------------------------------------------------------
// Vieneto kaina

const VNTkaina = document.querySelector('section.products-list > div.vnt-kaina');

const PrintUnitPrice = allItems => {

    const isEditable = currentPage.includes('edit.html');

    allItems.items.forEach(oneItem => {

        const tag = isEditable ? document.createElement('input') : document.createElement('p');

        if (isEditable) {
            tag.type = 'number';
            tag.step = '0.01'; // Allows decimals like 10.99
            tag.value = oneItem.price;
            tag.classList.add('edit-price');

            tag.addEventListener('input', e => {
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


const PrintCalculatedDiscountColumn = (CalculatedRows, allItems, activeIndex = null) => {

    const isEditable = currentPage.includes('edit.html');

    CalculatedRows.forEach((calculatedRow, index) => {

        const container = document.createElement('div');
        container.classList.add('discount-edit-container');

        // The original item from the main data array
        const originalItem = allItems.items[index];

        if (isEditable) {
            // 1. Create Value Input
            const valInput = document.createElement('input');
            valInput.type = 'number';
            valInput.value = originalItem.discount ? originalItem.discount.value : 0;
            valInput.classList.add('edit-discount-val');

            // 2. Create Type Selector
            const typeSelect = document.createElement('select');
            typeSelect.classList.add('edit-discount-type');

            const options = [
                { val: 'none', text: 'Be nuolaidos' },
                { val: 'percentage', text: '%' },
                { val: 'fixed', text: 'Eur' }
            ];

            options.forEach(opt => {
                const o = document.createElement('option');
                o.value = opt.val;
                o.innerText = opt.text;
                if (originalItem.discount && originalItem.discount.type === opt.val) o.selected = true;
                if (!originalItem.discount && opt.val === 'none') o.selected = true;
                typeSelect.appendChild(o);
            });

            // Event Listeners for both
            const updateDiscount = () => {
                const newVal = Number(valInput.value);
                const newType = typeSelect.value;

                if (newType === 'none') {
                    originalItem.discount = null;
                } else {
                    originalItem.discount = { type: newType, value: newVal };
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
                setTimeout(() => valInput.focus(), 0);
                // We use setTimeout 0 to wait until the browser finishes drawing
            }

        } else {
            // View mode (same as before)
            const DiscountTag = document.createElement('p');
            DiscountTag.innerText = calculatedRow.SingleUnitDiscountText;
            DiscountTag.classList.add('prekiu-listas');
            Nuolaida.appendChild(DiscountTag);
        }
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
    // const shippingas = allItems.shippingPrice;
    const isEditable = currentPage.includes('edit.html');
    const shippingRowNumber = allItems.items.length + 1;


    // Row Number
    EilesNr.insertAdjacentHTML('beforeend', `<p class="eiles-numeris">${shippingRowNumber}.</p>`);

    // Description
    PrekesPavadinimas.insertAdjacentHTML('beforeend', `<p style='font-weight: 500;' class="prekiu-listas">Transportavimo išlaidos</p>`);

    // Quantity (Fixed at 1)
    Kiekis.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">1</p>`);

    // VNTkaina.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">${shippingas.toFixed(2)}</p>`);
    // Nuolaida.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">-</p>`);


    // --- Price Column ---
    if (isEditable) {
        const shipInput = document.createElement('input');
        shipInput.type = 'number';
        shipInput.step = '0.01';
        shipInput.value = allItems.shippingPrice;
        shipInput.classList.add('edit-price'); // Use your existing CSS class

        shipInput.addEventListener('input', e => {
            allItems.shippingPrice = Number(e.target.value);
            RefreshUI(allItems); // Recalculate totals immediately
        });
        VNTkaina.appendChild(shipInput);
    } else {
        VNTkaina.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">${allItems.shippingPrice.toFixed(2)}</p>`);
    }

    // Static columns
    Nuolaida.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">-</p>`);

    // Sum Columns (These get updated by RefreshUI, but we need initial placeholders)
    const shipSumBe = document.createElement('p');
    shipSumBe.classList.add('prekiu-listas', 'shipping-sum-be'); // Added specific class for clearing
    shipSumBe.innerText = allItems.shippingPrice.toFixed(2);
    SumaBeNuolaidos.appendChild(shipSumBe);

    const shipSumSu = document.createElement('p');
    shipSumSu.classList.add('prekiu-listas', 'shipping-sum-su'); // Added specific class for clearing
    shipSumSu.innerText = allItems.shippingPrice.toFixed(2);
    SumaSuNuolaida.appendChild(shipSumSu);


    // SumaBeNuolaidos.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">${shippingas.toFixed(2)}</p>`);
    // SumaSuNuolaida.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">${shippingas.toFixed(2)}</p>`);
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
    const urlParams = new URLSearchParams(window.location.search);
    // const invoiceId = urlParams.get('id');
    const viewId = urlParams.get('id');
    const editId = urlParams.get('edit');

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
        const id = viewId || editId;
        const data = InvoiceStorage.read(id);

        if (data) {
            renderInvoiceData(data);

            // Hide the "Update (New from API)" button
            const apiRefreshBtn = document.querySelector('#api-refresh');

            if (apiRefreshBtn) {
                apiRefreshBtn.style.display = 'none';
            };


            const saveButton = document.querySelector('#save-invoice');

            if (viewId) {
                // VIEW MODE: Just hide the button
                if (saveButton) saveButton.style.display = 'none';
            } else {

                if (editId) {
                    if (saveButton) {
                        saveButton.innerText = 'Update Invoice';
                        saveButton.style.display = 'block';

                        saveButton.addEventListener('click', () => { // <--- Start of function

                            // 1. Check for invalid data
                            const hasInvalidData = data.items.some(item => {
                                const isPriceInvalid = item.price === '' || isNaN(item.price) || item.price < 0;
                                const isQtyInvalid = item.quantity === '' || isNaN(item.quantity) || item.quantity < 0;

                                let isDiscountInvalid = false;
                                if (item.discount && item.discount.value < 0) {
                                    isDiscountInvalid = true;
                                }
                                return isPriceInvalid || isQtyInvalid || isDiscountInvalid;
                            });

                            const isShippingInvalid = data.shippingPrice < 0;

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
        fetch('https://in3.dev/inv/')
            .then(res => res.json())
            .then(data => {
                console.log('Data from API:', data);
                renderInvoiceData(data);

                const saveButton = document.querySelector('#save-invoice');

                if (saveButton) {
                    saveButton.addEventListener('click', _ => {
                        InvoiceStorage.Store(data);
                        alert('Sąskaita - Faktūra išsaugota!');
                        window.location.href = 'list.html';
                    });
                }
            });
    }
};



/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// ======= VISŲ INVOICE'Ų LIST LOGIKA ======= /////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

if (currentPage.includes('list.html')) {
    const listBin = document.querySelector('#invoice-list-bin');

    if (InvoiceStorage.list.length === 0) {
        listBin.innerHTML = '<p>Sąrašas yra tuščias.</p>';
    } else {
        // Create a simple table or list
        let html = `
            <table border="1" style="width:100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr>
                        <th>Sąskaitos nr.</th>
                        <th>Sąskaitos data</th>
                        <th>Suma su PVM, EUR</th>
                        <th class="special-th">Pasirinkite veiksmą</th>
                    </tr>
                </thead>
                <tbody>
        `;

        InvoiceStorage.list.forEach(inv => {
            // We need the total sum for the list. 
            // We can reuse your logic!
            const rows = inv.items.map(item => CalculateRowSums(item));
            const totals = CalculateTotalSums(rows, inv.shippingPrice);

            html += `
                <tr>
                    <td>${inv.number}</td>
                    <td>${inv.date}</td>
                    <td>${totals.TotalSumWithVAT.toFixed(2)} EUR</td>
                    <td class="buttons-td">
                        <div>
                            <button class="view-btn" data-id="${inv.id}">Peržiūrėti</button>
                            <button class="edit-btn" data-id="${inv.id}">Redaguoti</button>
                            <button class="delete-btn" data-id="${inv.id}">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        listBin.innerHTML = html;

        // Add event listeners for Edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = e.target.dataset.id;
                window.location.href = `edit.html?edit=${id}`; // Note the ?edit=
            });
        });

        // Add event listeners for View buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = e.target.dataset.id;
                window.location.href = `view.html?id=${id}`;
            });
        });

        // Add event listeners for Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                if (confirm('Ar tikrai norite ištrinti šią sąskaitą - faktūrą?')) {
                    const id = e.target.dataset.id;
                    InvoiceStorage.Destroy(id);
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
        BebroIMG.src = '../images/bebras.png';
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
            window.location.href = window.location.href = '';
        });
    })
};

if (currentPage.includes('create.html') || currentPage.includes('view.html') || currentPage.includes('edit.html')) {
    DangerButton.addEventListener('click', SecretWeapon);
};



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



const RefreshUI = (data, activeIndex = null) => {
    // 1. Clear the old numbers from the screen so they don't stack
    Nuolaida.innerHTML = '<h4>VNT Nuolaida,<br>EUR</h4>';
    SumaBeNuolaidos.innerHTML = '<h4>Suma be nuolaidos<br> be PVM,<br> EUR</h4>';
    SumaSuNuolaida.innerHTML = '<h4>Suma su nuolaida<br> be PVM,<br> EUR</h4>';

    // 2. Clear the old Shipping labels from the static columns
    // (We use a specific selector to remove the <p> and <input> tags we added manually)
    EilesNr.querySelectorAll('.shipping-row').forEach(el => el.remove());
    PrekesPavadinimas.querySelectorAll('.shipping-row').forEach(el => el.remove());
    Kiekis.querySelectorAll('.shipping-row').forEach(el => el.remove());
    VNTkaina.querySelectorAll('.shipping-row').forEach(el => el.remove());

    // Clear the spans inside the final total paragraphs
    GalutineSumaBePVM.querySelector('span')?.remove();
    PVMsuma.querySelector('span')?.remove();
    GalutineSumaSuPVM.querySelector('span')?.remove();

    // Clear shipping rows specifically so they don't duplicate
    document.querySelectorAll('.shipping-sum-be, .shipping-sum-su').forEach(el => el.remove());

    // 2. Re-calculate based on the new quantities
    const CalculatedRows = data.items.map(item => CalculateRowSums(item));

    // 3. Re-print the updated numbers
    PrintCalculatedDiscountColumn(CalculatedRows, data, activeIndex);
    PrintSumsWithoutDiscount(CalculatedRows);
    PrintSumsWithDiscount(CalculatedRows);

    // 5. FIX: Re-run the Shipping logic so it reappears at the bottom
    // PridedamShipping(data);

    // 4. Re-print the Shipping Sums at the very bottom of the columns
    SumaBeNuolaidos.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">${data.shippingPrice.toFixed(2)}</p>`);
    SumaSuNuolaida.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">${data.shippingPrice.toFixed(2)}</p>`);
    Nuolaida.insertAdjacentHTML('beforeend', `<p class="prekiu-listas">-</p>`);

    // 5. Update Final Totals
    const FinalTotals = CalculateTotalSums(CalculatedRows, data.shippingPrice);
    PrintFinalTotals(FinalTotals);

    // Update shipping sum displays if they exist as tags
    const shipBe = document.querySelector('.shipping-sum-be');
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
    const CalculatedRows = data.items.map(item => CalculateRowSums(item));
    PrintCalculatedDiscountColumn(CalculatedRows, data);
    PrintSumsWithoutDiscount(CalculatedRows);
    PrintSumsWithDiscount(CalculatedRows);
    // CalculateTotalSums(CalculatedRows);
    PridedamShipping(data);
    const FinalTotals = CalculateTotalSums(CalculatedRows, data.shippingPrice);
    PrintFinalTotals(FinalTotals);
    PrintDueDate(data);

    console.log(CalculatedRows);
}