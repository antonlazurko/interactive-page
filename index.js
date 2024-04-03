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
const URL_APP = 'https://script.google.com/macros/s/AKfycbyKPkD-FxMJRw09AJZhb3xzcQTEFpWcH-R6-MqVrmMS9sFJ7lcYoUXpO5Eh1KPVt8V0_g/exec'

const form = document.querySelector("#myForm");
form.action = URL_APP;

function isFilled(details) {
    const { name, email, phone, rule } = details;
    if (!name) return false;
    if (!email) return false;
    if (!phone) return false;
    if (!rule) return false;
  return true;
}


form.addEventListener("submit", async (ev) => {console.log(ev);
    ev.preventDefault();

    const name = document.querySelector("[name=name]");
    const email = document.querySelector("[name=email]");
    const phone = document.querySelector("[name=phone]");
    let details = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
    };
    console.log(details);
    // if (!isFilled(details)) return;

    let formBody = [];
    for (let property in details) {

        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    const result = await fetch(URL_APP, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        mode: "cors",
        body: formBody,
        })
    .then((res) => res.json())
    .catch((err) => console.log("Ошибка!", err))
    console.log(result);
    if( result.type === 'success' ) {
        name.value = '';
        email.value = '';
        phone.value = '';
        alert('Спасибо за заявку!')
    }
    if( result.type === 'error' ) {
        console.log(`Ошибка( ${result.errors}`)
    }
});

function onSubmit(e) {
    e.preventDefault();
    sendDataToGoogleSheet({name: 'Test', email: 'test@mail.com', phone: 123123});
    result.innerText = `Total Strikes: ${clickedArray.length}`;
    clickedArray.length = 0;
    document.querySelectorAll('img').forEach(el => el.parentNode.style.opacity = 1)
}
