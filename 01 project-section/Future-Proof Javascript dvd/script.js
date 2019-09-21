//user selects item
//notification alerts user that "item" is selected and added to array
//create array and add item to array
//notify user of the total selected items
//user clicks save button and alerts the user on the total amount of items selected

var notify = document.querySelector('.notify');
var dvds = document.querySelectorAll('.dvd');
var itemsTotal = document.querySelector('.items-total');
var saveBtn = document.querySelector('.btn');

var dvdsSelected = [];
var i = 0;

while (i < dvds.length) {
    dvds[i].onclick = function(e) {
        var dvdTitle = this.querySelector('.title').textContent;

        if (this.classList.contains('selected') !== true) {
            this.classList.add('selected')
            dvdsSelected.push(dvdTitle)
        } else {
            this.classList.remove('selected')
            dvdsSelected = dvdsSelected.filter(function(item) {
                return item !== dvdTitle
            })
        }
        console.log(dvdsSelected);
    }
    i++;
}

saveBtn.onclick = function() {
    itemsTotal.textContent = dvdsSelected.length + ' items saved'
    notify.classList.add('active')

    setTimeout(function() {
        notify.classList.remove('active')
    }, 2000)

    console.log('saved')
}