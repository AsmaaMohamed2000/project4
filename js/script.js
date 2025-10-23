// localStorage.clear()

let container=document.querySelector('.container3')
let productsDiv=document.querySelector('.products')
let form = document.getElementById('form');
let spnCount = document.getElementById('count');
let userinfo=document.querySelector('.userinfo')
let username=document.getElementById('username')
let searchinp=document.querySelector('input[type="Search"]')
let selectbtn=document.querySelector('select')
let loginBtn=document.getElementById('login')
let selectedLink=document.querySelector('.productsLink')
let registerBtn=document.getElementById('register')
let selectedPro=document.getElementById('selectedPro')
let favContainet=document.querySelector('.favourites')
let logout=document.querySelector('.logout')
let cart=document.querySelector('.cart')
let count=parseInt(localStorage.getItem('count')) || 0
let favourites=JSON.parse(localStorage.getItem('favourites')) || []
let chosenproducts = JSON.parse(localStorage.getItem('chosenproducts')) || [];
chosenProducts(chosenproducts)
showFavs(favourites);
spnCount.innerHTML=count
logout.addEventListener('click',function(){
  localStorage.clear()
  window.location.href='index.html'
})


if(localStorage.getItem('email')!==null){
  form.remove()
  userinfo.style.display='flex'
  username.innerHTML=` ${localStorage.getItem('firstName')} ${localStorage.getItem('secondName')}`
}else {
    form.style.display = 'flex';
    userinfo.remove()
  }
loginBtn.onclick=function(){
  window.location.href='login.html'
}
registerBtn.onclick=function(){
  window.location.href='register.html'
}
let information=[
  {
    id:1,
    src:"images/7.jpeg",
    title:'Modern center table',
    price:'2000 LE',
    category:'Tables'
  }
  ,
    {
    id:2,
     src:"images/4.jpeg",
    title:' Lighted decorative tree',
    price:'1000 LE',
    category:'Decoration '
  }
  ,
    {
    id:3,
     src:"images/3.jpeg",
    title:' Rocking Chai',
    price:'2000 LE',
    category:'Chairs'
  }
  ,
    {
    id:4,
     src:"images/8.jpeg",
    title:'Tree vase',
    price:'800 LE',
    category:'Decoration'
  }
  ,
    {
    id:5,
     src:"images/2.jpeg",
    title:'Decorative mirror',
    price:'2000 LE',
    category:'Mirrors'
  }
  ,
    {
    id:6,
     src:"images/6.jpeg",
    title:' Modern curtain',
    price:'600 LE',
    category:' Curtains'
  }
  ,
    {
    id:7,
     src:"images/1.jpeg",
    title:'Turkish carpet',
    price:'2000 LE',
    category:'Carpets '
  }
  ,
    {
    id:8,
     src:"images/9.jpeg",
    title:'Decorative chandelier',
    price:'3000 LE',
    category:' Decoration'
  }
  ,
    {
    id:9,
     src:"images/5.jpeg",
    title:' Decorative lamp',
    price:'700 LE',
    category:' Decoration'
  }
]
function showAllProducts(data=information){
  let elements=data.map((item,index)=>{
    return `
    <div class="content mt-3 card p-0 pb-4 rounded-2">
        <img src=${item.src} class='rounded-2' alt="" />
        <div class="mt-3 " >
          <h6 style="transform: translateX(-50%); margin-left:50%" class="">${item.title}</h6>
          <p style="transform: translateX(-50%); margin-left:50%">price : ${item.price}</p>
          <p style="transform: translateX(-50%); margin-left:50% ; white-space:nowrap">category :${item.category}</p>
          <div style="transform: translateX(-50%); margin-left:50% ; white-space:nowrap">
            <i onclick=favourite(${item.id},this)  class="fas fa-heart icon" style='font-size:20px'></i>
          <button onclick="addToCard(${item.id}, this)" style="padding: 8px 11px; outline:none; border:0" class="ms-2 rounded-3 addBtn">Add to card</button>
        </div>
          </div>
      </div>
    `
  })

  container.innerHTML=elements.join('')
}
showAllProducts(information)
searchinp.addEventListener('input' ,filteredData)
function filteredData(){
  if(selectbtn.value==='Search-by-product-name'){
      let filtereddata=information.filter((item)=>{
            return item.title.toLowerCase().includes(searchinp.value.toLowerCase())
  })
    showAllProducts(filtereddata)

  }else{
       let filtereddata=information.filter((item)=>{
            return item.category.toLowerCase().includes(searchinp.value.toLowerCase())
  })
    showAllProducts(filtereddata)
  }
        }


function addToCard(id, btn) {
if(localStorage.getItem('email')){
    let obj = information.find(item => item.id === id);
  let indexInCart = chosenproducts.findIndex(item => item.id === id);

  if (indexInCart === -1) {
    // Not in cart — Add it
    chosenproducts.push({ ...obj, count: 1 });
    count++;
    btn.innerHTML = 'Remove from cart';
     btn.style.background='#F38406FF'
  } else {
    // In cart — Remove it
    chosenproducts.splice(indexInCart, 1);
    count--;
    btn.innerHTML = 'Add to cart';
     btn.style.background='#F8BA47FF '
  }

  localStorage.setItem('count', count);
  spnCount.innerHTML = count;
chosenproducts=chosenproducts.filter((item,index,arr)=>
  index===arr.findIndex((i,index)=>i.id===item.id )
)
localStorage.setItem('chosenproducts',JSON.stringify(chosenproducts))
chosenProducts(chosenproducts)
}
}


// function addToCard(i){
//   count++
//   localStorage.setItem('count',count)
// spnCount.innerHTML=count

// let obj=information.find((item)=>{
//   return item.id===i
// })
//   let existingProduct = chosenproducts.find(item => item.id === i);

//   if (existingProduct) {
//     existingProduct.count = (existingProduct.count || 1) + 1;
//   } else {
//     chosenproducts.push({ ...obj, count: 1 });
//   }

// chosenproducts=chosenproducts.filter((item,index,arr)=>
//   index===arr.findIndex((i,index)=>i.id===item.id )
// )
// localStorage.setItem('chosenproducts',JSON.stringify(chosenproducts))
// chosenProducts(chosenproducts)
// }
function chosenProducts(chosenproducts){
  let elements =chosenproducts.map((item)=>{
    return `
  <div class='d-flex gap-4 p-3 pb-0 selec'>
      <div>
        <h6 style='font-size:13px'>${item.title}</h6>
        <div class='d-flex gap-1'>
        <span class=' border border-4 rounded-2 dec' onclick=decrement(${item.id})>-</span>
        <span  id='${item.id}'>${item.count}</span>
        <span class=' border rounded-2 border-4 increment'  onclick=increment(${item.id})>+</span>
        </div>
      </div>
      <span style='font-size:13px'>Price ${item.price}</span>
    </div>
`
  })
  selectedPro.innerHTML=elements.join('')

}
function increment(i){
  count++
  localStorage.setItem('count',count)
spnCount.innerHTML=count
let index=chosenproducts.findIndex((item)=>item.id===i)
chosenproducts[index].count++;
 localStorage.setItem('chosenproducts', JSON.stringify(chosenproducts));
    chosenProducts(chosenproducts);


}
function decrement(i){
count--
  localStorage.setItem('count',count)
spnCount.innerHTML=count
let index=chosenproducts.findIndex((item)=>item.id===i)
chosenproducts[index].count--;
    if (chosenproducts[index].count < 1) {
      chosenproducts.splice(index, 1);
    }
    localStorage.setItem('chosenproducts', JSON.stringify(chosenproducts));
    chosenProducts(chosenproducts);


}
if(count<0){
   count=0
localStorage.setItem('count',count)
 spnCount.innerHTML=count

}
function favourite(i,ico){
  ico.style.color='red'
    let Fav=information.find((item,index)=>{
    return item.id===i
  })
  // favourites.push(Fav)
  let chosenItem=favourites.find((e)=>e.id===i)
  if(!chosenItem){
    favourites.push(Fav)

  }
//     favourites=favourites.filter((item,index,arr)=>
//   index===arr.findIndex((i,index)=>i.id===item.id )
// )
  localStorage.setItem('favourites',JSON.stringify(favourites))
  showFavs (favourites)

}

function showFavs (FavArray){
  favContainet.innerHTML = ''
FavArray.forEach((item)=>
  favContainet.innerHTML+=`
  <div class=' p-3 py-0 mb-3 '>
                  <h6 style='font-size:13px'>${item.title}</h6>
                 <div>
                  <span style='font-size:13px'>${item.category}</span>
                    <i onclick=deleteFav(${item.id}) style='color:red;cursor:pointer' class="fas fa-heart  ms-2"></i>
                 </div>
                </div>

`
  
)}

function deleteFav(i){
  let index=favourites.findIndex((item)=>item.id===i)
  favourites.splice(index,1)
   localStorage.setItem('favourites',JSON.stringify(favourites))
  showFavs (favourites)

}


cart.addEventListener('click',showProducts)
function showProducts(){
   if (favContainet.innerHTML.trim()==='' &&selectedPro.innerHTML.trim()===''){
    productsDiv.classList.remove('active');
     productsDiv.innerHTML=''
 }else{
 productsDiv.classList.toggle('active')
 }

}





// count=0
// localStorage.setItem('count',count)
// spnCount.innerHTML=count