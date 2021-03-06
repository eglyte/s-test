let timeout;
const actionButtonOpen = document.querySelector('.action__cart'),
    actionButtonClose = document.querySelector('.action__close'),
    loader = document.querySelector('.loader'),
    overlay = document.querySelector('.overlay'),
    panel = document.querySelector('.panel-wrap');

actionButtonOpen.onclick = function () {
    onOpen();
};

actionButtonClose.addEventListener('click', function (event) {
    onClose();
});

function onOpen() {
    loader.style.display = "block";
    overlay.style.display = "block";

    timeout = setTimeout(showPanel, 1000);
}

function onClose() {
    panel.classList.add('closing');
    timeout = setTimeout(hidePanel, 1000);
}

function hidePanel() {
    overlay.style.display = "none";
    panel.style.display = "none";
    panel.classList.remove('closing');
}

function showPanel() {
    loader.style.display = "none";
    panel.style.display = "block";
}