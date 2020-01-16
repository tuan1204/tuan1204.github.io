function myFunction() {
    hidden = document.getElementById('thuc-don');
    if (hidden.style.display === 'none') hidden.style.display = 'block';
    else hidden.style.display = 'none';
};

function myGioiThieu() {
    let t = document.getElementById('gioi-thieu');
    if (t.style.display === 'none') t.style.display = 'block';
    else t.style.display = 'none';
};

function myKhongGian() {
    let x = document.getElementById('khong-gian');
    if (x.style.display === 'none') x.style.display = 'block';
    else x.style.display = 'none';
};

function myDatBan() {
    let y = document.getElementById('dat-ban');
    if (y.style.display === 'none') y.style.display = 'block';
    else y.style.display = 'none';
};

function numberClick() {
    let z = document.getElementById('menuChinh');
    if (z.style.display === 'none') z.style.display = 'block';
    else z.style.display = 'none';
    let c = document.getElementById('thanhToan');
    if (c.style.display === 'none') c.style.display = 'block';
    else c.style.display = 'none';
};

/*(function () {
    var index = 1;

    $('.btn-choose').on('click', choose);
    $('.btn-choose1').on('click', choose1);
    $('#bill-table').on('change keyup paste', '.bill-quantity', changeValue);

    function choose() {
        var self = this,
            bill = $('#bill-table'),
            data = getDataMenu($(self).parent().parent()),
            html = createRow(data);

        if (bill.find('.empty').length) {
            bill.empty();
        }

        bill.append(html);
    }

    function choose1() {
        var self = this,
            bill = $('#bill-table'),
            data1 = getToTal($(self).parent().parent()),
            html = createRow1(data1);
    }

    function changeValue() {
        var self = this,
            row = $(self).parent().parent(),
            data = getDataBill(row);

        row.find('.bill-total').html(calculate(data.price, data.quantity));
    }

    function getDataMenu(row) {
        var id = $(row.find('.col-id')).html(),
            name = $(row.find('.col-name')).html(),
            price = $(row.find('.col-price')).html();

        var data = {
            id: id,
            name: name,
            price: price
        }

        return data;
    }

    function getDataBill(row) {
        var price = $(row.find('.bill-price')).html(),
            quantity = $(row.find('.bill-quantity')).val();

        var data = {
            price: price,
            quantity: quantity,
        }

        return data;
    }

    function createRow(data) {
        var html = '<tr>';

        html += '<td>' + index++ + '</td>';
        html += '<td>' + data.id + '</td>';
        html += '<td>' + data.name + '</td>';
        html += '<td class="bill-price">' + data.price + '</td>';
        html += '<td><input type="text" value="1" class="bill-quantity" /></td>';
        html += '<td class="bill-total">' + calculate(data.price, 1) + '</td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '</tr>';

        return html;
    }

    function calculate(price, quantity) {
            return price * quantity;
    }

    function getToTal(row) {
        var tong = $(row.find('.bill-total')).val();
        var data1 = {
            tong: tong,
        }
        var initialValue = 0;
        var sum = [{tong: tong}].reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.tong;
        }, initialValue)
        console.log(sum)
    }
    function createRow1(data1) {
        var f = '<tr>';
        f += '<td colspan="5" >Tổng Tiền</td>';
        f += '<td colspan="3" onclick="tinhTien()"> '+ sum+ '</td>';
        f += '</tr>';

        return f;
    }
})();*/
var cart = [];
$(document).ready(function () {
    $('.add2cart').on('click', function () {
        var maId = $(this).attr('producId');
        var pName = $('#MA-' + maId).children('.productName').text();
        var price = $('#MA-' + maId).find('#price').text();
        var obj = {
            id: maId,
            productName: pName,
            price: price
        };
        //check san pham co trong bill tt
        var flag = false;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id == obj.id) {
                flag = true;
                break;
            }
        }
        //san phan chua co trong gio
        if (flag === false) {
            obj.quantity = 1;
            cart.push(obj);
        } else {
            cart[i].quantity += 1;
        }
        drawCheckout();
    });
});

function drawCheckout() {
    $('#bill-table').empty();
    var ckUnit = "";
    var totalMoney=0;
    for (var i = 0; i < cart.length; i++) {
        totalMoney += cart[i].price * cart[i].quantity;
        ckUnit += `
        <tr>
        <td>${'MA'+cart[i].id}</td>
        <td>${cart[i].productName}</td>
        <td>

        <input type="number" name="" value="${cart[i].quantity}" min="0" step="1">
        <button type="button" class="btn btn-xs btn-info">
            <span class="glyphicon glyphicon-remove"></span>
        </button>
        </td>
        <td>
        <b><span class="unit-price">${cart[i].price * cart[i].quantity}</span></b>
        </td>
        </tr>
        `;
    }
    ckUnit += `
    <tr>
    <td colspan="3">Total Price</td>
    <td><b><span class="unit-price">${totalMoney}</span></b></td>
    </tr>
    `
    $('#bill-table').append(ckUnit);
}