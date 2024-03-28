const clickedArray = [];
const list = document.querySelector('#list');
const interactiveImage = document.querySelector('.interactive-image');
const result = document.querySelector('#result');
const submitBtn = document.querySelector('#submitBtn');

interactiveImage.addEventListener('load', () => {
    document.querySelectorAll('li').forEach(el => el.style.opacity = 1)
})
list.addEventListener('click', e => onClickImg(e));
submitBtn.addEventListener('click', e => onSubmit(e));
function onClickImg(e) {
    result.innerText = ''
    if (e?.target?.nodeName === 'IMG' && e.target.id) {
        if (!clickedArray.includes(e.target.id)) {
            clickedArray.push(e.target.id)
            e.target.parentNode.style.opacity = 0
        }
    }
}
function onSubmit() {
    result.innerText = `Total Strikes: ${clickedArray.length}`;
    clickedArray.length = 0;
    document.querySelectorAll('img').forEach(el => el.parentNode.style.opacity = 1)
}
