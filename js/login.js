let form=document.querySelector('form')
let email=document.querySelector('input[ type="email"]')
let password=document.querySelector('input[ type="password"]')
let rightEmail=localStorage.getItem('email')
let rightpassword=localStorage.getItem('password')
form.addEventListener('submit',function(e){
    e.preventDefault()

    if(email.value==='' || password.value===''){
        alert('fill all data')
    }else{
         if(rightEmail&&rightEmail.trim()===email.value.trim()&&rightpassword&&rightpassword.trim()===password.value){
        window.location.href='index.html'
    }
    
    else{
         alert('wrong email or password')
    }


    }
   

})

