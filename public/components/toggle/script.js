let toggle = document.querySelector('.toggle')
let circle = document.querySelector('.toggle span')
let moon = document.querySelector('.switcher i')
console.log(document.querySelector('input'));
const toggler = () => {
    toggle.onclick = () => {
        circle.classList.toggle('on')
        if (circle.classList.contains('on')) {
            toggle.style.backgroundColor = '#A445ED'
            moon.style.color = '#A445ED'
            document.body.style.backgroundColor = '#000'
            document.querySelector('input').style.backgroundColor = '#1f1f1f'
            document.querySelector('input').style.color = '#fff'
            document.querySelector('.sBtn-text').style.color = '#fff'
            document.querySelector('.word_spelling').style.color = '#fff'
            document.querySelector('.word_type_title').style.color = '#fff'
            document.querySelector('.word_definitions li').style.color = '#fff'
        } else {
            toggle.style.backgroundColor = '#757575'
            moon.style.color = '#757575'
            document.body.style.backgroundColor = '#fff'
            document.querySelector('input').backgroundColor = '#fff'
            document.querySelector('input').style.backgroundColor = '#F4F4F4'
            document.querySelector('input').style.color = '#000'
            document.querySelector('.sBtn-text').style.color = '#000'
            document.querySelector('.word_spelling').style.color = '#000'
            document.querySelector('.word_type_title').style.color = '#000'
            document.querySelector('.word_definitions  li').style.color = '#000'
        }
    }
}