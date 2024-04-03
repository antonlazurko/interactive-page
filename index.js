const SHEET_URL = 'https://script.google.com/macros/s/AKfycby4ip8jyuozVw6u6xEQk98G3Z205LC2M-9DqYBrDc7eevVEqKYk6A7YTVLo904EgzRSFw/exec';
const clickedArray = [];
const list = document.querySelector('#list');
const interactiveImage = document.querySelector('.interactive-image');
const result = document.querySelector('#result');

document.getElementById("form").addEventListener("submit", onSubmit);


interactiveImage.addEventListener('load', () => {
    document.querySelectorAll('li').forEach(handleIconVisible);
});

list.addEventListener('click', e => onClickImg(e));

function handleIconVisible(icon) {icon.style.opacity = 1}

function sendDataToGoogleSheet() {
    fetch(SHEET_URL, {
        method: 'POST',
        body: new FormData(document.getElementById('form')),
    })
    .then(response => {
        if (response.ok) {
        console.log('Data successfully sent to Google Sheet');
        result.innerText = `Total Strikes: ${clickedArray.length}`;
        clickedArray.length = 0;
        document.querySelectorAll('li').forEach(handleIconVisible);
        } else {
        console.error('Error sending data to Google Sheet');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function onClickImg(e) {
    result.innerText = ''
    if (e?.target?.nodeName === 'IMG' && e.target.id) {
        if (!clickedArray.includes(e.target.id)) {
            clickedArray.push(e.target.id)
            e.target.parentNode.style.opacity = 0
        }
    }
}

function onSubmit(event) {
    event.preventDefault();

    sendDataToGoogleSheet();
    this.reset();
}
