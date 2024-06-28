const image1 = document.getElementById('image1');
const btn1 = document.getElementById('interpret1');
const intrepretation1 = document.querySelector('.box1');
const ok = document.querySelector('.ok');
const btn2 = document.getElementById('interpret2');
const interpretation2 = document.querySelector('.box2');
const ok1 = document.querySelector('#ok1');
btn1.addEventListener('click', () => {
    intrepretation1.style.visibility = 'visible';
})
ok.addEventListener('click', () => {
    intrepretation1.style.visibility = 'hidden';
})

btn2.addEventListener('click', () => {
    interpretation2.style.visibility = 'visible';
})
ok1.addEventListener('click', () => {
    interpretation2.style.visibility = 'hidden';
})