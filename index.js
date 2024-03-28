document.addEventListener('DOMContentLoaded', function() {
    const clickedArray = [];
    const list = document.querySelector('#list');
    const result = document.querySelector('#result');
    list.addEventListener('click', e => onClickImg(e));

    const submitBtn = document.querySelector('#submitBtn');
    submitBtn.addEventListener('click', e => onSubmit(e));
    function onClickImg(e) {
        result.innerText = ''
        if (e?.target?.nodeName === 'IMG' && e.target.id) {
            if (!clickedArray.includes(e.target.id)) {
                clickedArray.push(e.target.id)
                e.target.style.display = 'none'
            }
        }
    }

    function onSubmit() {
        result.innerText = `Total Strikes: ${clickedArray.length}`;
        clickedArray.length = 0;
        document.querySelectorAll('img').forEach(el => el.style.display = 'block')
    }
});
