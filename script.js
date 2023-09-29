function changeText(){
    var replaceText = document.getElementsByClassName("mini-text");
    replaceText[0].innerHTML = "Scroll to see";
    
    document.getElementById("icon-up").style.display = "none";
    document.getElementById("icon-down").style.display = "block";
}


var btnSubmit = document.querySelector('.submit')
var modal = document.querySelector('.modal-container')

if (btnSubmit){
    btnSubmit.addEventListener('click', function(){
        modal.classList.add('show');

        const next = document.querySelector('.next');
        next.setAttribute('value', 'http://127.0.0.1:5500/contact.html');
    });
}