// treeview.js

document.addEventListener('DOMContentLoaded', function () {
    var tree = document.querySelectorAll('ul.treeview li.parent_li > span');

    tree.forEach(function (element) {
        element.addEventListener('click', function (e) {
            var children = this.parentElement.querySelectorAll('ul > li');
            if (children.length > 0) {
                children.forEach(function (child) {
                    child.style.display = (child.style.display === 'none' || child.style.display === '') ? 'block' : 'none';
                });
                this.classList.toggle('expanded');
            }
            e.stopPropagation();
        });
    });
});
