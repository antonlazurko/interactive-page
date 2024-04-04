const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzqlgBuV4Az8Z5rMq6p2oI-3587Q5HUJr5kBbKF65E870Sbj7oyq7FhAMvqsai8Xv0F2w/exec';
const clickedArray = [];
const list = document.querySelector('#list');
const interactiveImage = document.querySelector('.interactive-image');
const result = document.querySelector('#result');
const loader = document.querySelector('#loader');
const form = document.querySelector('#form');

form.addEventListener("submit", onSubmit);


interactiveImage.addEventListener('load', () => {
    document.querySelectorAll('li').forEach(handleIconVisible);
});

list.addEventListener('click', e => onClickImg(e));

function handleIconVisible(icon) {icon.style.opacity = 1}

function sendDataToGoogleSheet() {
    form.style.visibility = 'hidden';
    loader.style.visibility = 'initial'

    const formData = new FormData(form)
    formData.append('result', clickedArray.length)

    fetch(SHEET_URL, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
        console.log('Data successfully sent to Google Sheet');
        result.innerText = `Total Strikes: ${clickedArray.length}`;
        clickedArray.length = 0;
        document.querySelectorAll('li').forEach(handleIconVisible);
        form.style.visibility = 'inherit';
        loader.style.visibility = 'hidden';
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
