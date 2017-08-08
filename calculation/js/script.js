/**
 *  Class Calculator v1.01
 *  @author: Lezhnev (lezhnevod@gmail.com)
 *
 * setOperation --------------------------------------------------------------
 *
 * setNumber -----------------------------------------------------------------
 *
 * setAlign ------------------------------------------------------------------
 *
 * getResult -----------------------------------------------------------------
 *
 * cleanOperation ------------------------------------------------------------
 *
 * calculate -----------------------------------------------------------------
 *
 */

var calc = new Vue({
    el: '#calculator',
    data: {
        number: {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            zero: 0,
        },
        operations: {
            minus: '-',
            plus: '+',
            times: '*',
            divided: '/',
            clean: 'сброс',
            point: '.',
            equals: '='
        },
        errors: {
            vvod: false,
        },
        result: '',
        arrItem: new Array(),
        newNumber: '',
        operation: false
    },
    methods: {
        setOperation: function (item) {
            if (this.arrItem.length > 0){
                if (this.arrItem[this.arrItem.length - 1].type=='operator') {
                    this.arrItem[this.arrItem.length - 1].item = item;
                } else {
                    var arr = new Array();
                    arr['type'] = 'operator';
                    arr['item'] = item;
                    this.arrItem.push(arr);
                }
                this.result = this.getResult();
            }
        },
        setNumber: function (item) {
            //проверить на .
            if (this.arrItem.length > 0 && this.arrItem[this.arrItem.length - 1].type == 'number') {
                var newNumber = this.arrItem[this.arrItem.length - 1].item + item;
                if (!(/^([0-9]+)([.,]?)([0-9]*)$/.test(newNumber))) {
                    return;
                }
                this.arrItem[this.arrItem.length - 1].item += '' + item;
            } else {
                if (item == '.') {
                    item = '0.';
                }
                var arr = new Array();
                arr['type'] = 'number';
                arr['item'] = item;
                this.arrItem.push(arr);
            }


            this.result = this.getResult();

        },
        getResult: function () {
            var strItem = ""
            for (var i = 0; i < this.arrItem.length; i++) {
                strItem += this.arrItem[i].item;
            }
             return strItem;
        },

        cleanOperation: function () {
            this.arrItem = [];
            this.result = '';
            this.newNumber = '';
        },

        calculate: function () {
            var operator ='';
            var result = 0;

            for (var i = 0; i < this.arrItem.length; i++) {
                if(this.arrItem[i].type == 'operator'){
                    operator = this.arrItem[i].item;
                }else{
                    switch (operator) {
                        case '+':
                            result += parseFloat(this.arrItem[i].item);
                            break;
                        case '-':
                            result -= parseFloat(this.arrItem[i].item);
                            break;
                        case '*':
                            result *= parseFloat(this.arrItem[i].item);
                            break;
                        case '/':
                            result /= parseFloat(this.arrItem[i].item);
                            break;
                        default:
                            result = parseFloat(this.arrItem[i].item);
                            break;
                    }
                }
            }
            this.cleanOperation();
            this.setNumber(result);

        }

    },

})