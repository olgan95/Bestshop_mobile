function getElement(form, summary){
    const map = {
        products: 0.5,
        orders: 0.5,
        package:{
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 35,
        terminal: 5
    };

    this.form = {
        products: form.querySelector("#products"),
        orders: form.querySelector("#orders"),
        package: form.querySelector("#package"),
        accounting: form.querySelector("#accounting"),
        terminal: form.querySelector("#terminal")
    };

    this.summary = {
        products: summary.querySelector("ul [data-id = 'products']"),
        orders: summary.querySelector("ul [data-id = 'orders']"),
        package: summary.querySelector("ul [data-id = 'package']"),
        accounting: summary.querySelector("ul [data-id = 'accounting']"),
        terminal: summary.querySelector("ul [data-id = 'terminal']"),
        totalPrice: summary.querySelector("#total-price"),

    };

    this.inputElements = function(event){
        const value = event.target.value;
        const id = event.target.id;

        this.summary[id].querySelector(".item__calc").innerHTML = `$${value} * ${map[id]}`;
        this.summary[id].querySelector(".item__price").innerHTML = `$${value * map[id]}`;

        if (value !== "" && value !== 0) {
            this.summary[id].classList.add("open");
            //updateTotalPrice()
        } else{
            this.summary[id].classList.remove("open");
            this.summary[id].querySelector(".item__price").innerHTML = "0";
        }
        this.updateTotalPrice()
    };

    this.selectElements = function(event) {
        this.form.package.classList.toggle("open");
        const value = event.target.dataset.value;

        if (value !== undefined) {
            this.form.package.querySelector(".select__input").innerHTML = value;
            this.form.package.querySelector(".select__input").style.textTransform = "capitalize";
            this.summary.package.classList.add("open");
            this.summary.package.querySelector(".item__price").innerHTML = `$${map.package[value]}`
            this.summary.package.querySelector(".item__calc").innerHTML = `${value}`
            this.updateTotalPrice();
        }
    }

    this.addCheckboxCost = function(event){
        const value = event.target.id;
        const checked = this.form[value].checked;

        if (checked){
            this.summary[value].classList.add("open");
            this.summary[value].querySelector(".item__price").innerHTML = `$${map[value]}`;
        } else {
            this.summary[value].classList.remove("open");
            this.summary[value].querySelector(".item__price").innerHTML = `0`;
        }
        this.updateTotalPrice()
    };

    this.updateTotalPrice = function(event){
        const listItems = summary.querySelectorAll("ul li.open")
        const products = parseFloat(this.summary.products.querySelector(".item__price").innerHTML.replace(/[^0-9\.,]/, ''));
        const orders = parseFloat(this.summary.orders.querySelector(".item__price").innerHTML.replace(/[^0-9\.,]/, ''));
        const package = parseFloat(this.summary.package.querySelector(".item__price").innerHTML.replace(/[^0-9\.,]/, ''));
        const accounting = parseFloat(this.summary.accounting.querySelector(".item__price").innerHTML.replace(/[^0-9\.,]/, ''));
        const terminal = parseFloat(this.summary.terminal.querySelector(".item__price").innerHTML.replace(/[^0-9\.,]/, ''));
        const totalPrice = products + orders + package + accounting + terminal;


        if (listItems.length > 0) {
            this.summary.totalPrice.classList.add("open");
            this.summary.totalPrice.querySelector(".total__price").innerHTML = `$${totalPrice}`
        } else {
            this.summary.totalPrice.classList.remove("open");
        }

    };

    this.addEvents = function() {
        this.form.products.addEventListener("change", this.inputElements.bind(this));
        this.form.products.addEventListener("keyup", this.inputElements.bind(this));
        this.form.orders.addEventListener("change", this.inputElements.bind(this));
        this.form.orders.addEventListener("keyup", this.inputElements.bind(this));
        this.form.package.addEventListener("click", this.selectElements.bind(this));
        this.form.accounting.addEventListener("click", this.addCheckboxCost.bind(this));
        this.form.terminal.addEventListener("click", this.addCheckboxCost.bind(this));
    };

    this.addEvents();
}


const form = document.querySelector(".calc__form");
const summary = document.querySelector(".calc__summary");

new getElement(form, summary);


