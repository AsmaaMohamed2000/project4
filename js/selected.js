let spnCount = document.getElementById('Count');

let userinfo=document.querySelector('.userinfo')
let username=document.getElementById('Username')
let container=document.querySelector('.container4')
let addedToCard=document.querySelector('.addedTocard')
let count=parseInt(localStorage.getItem('count'))
let favContainet=document.querySelector('.favourites')
let logout=document.querySelector('.logout')
let totalprice=document.querySelector('.totalprice')
let price= 0
spnCount.innerHTML=count
let favourites=JSON.parse(localStorage.getItem('favourites')) || []
let chosenproducts = JSON.parse(localStorage.getItem('chosenproducts')) || [];
showAllProducts(chosenproducts)
showFavs(favourites);
logout.addEventListener('click',function(){
  localStorage.clear()
  window.location.href='index.html'
})
if(count<0){
   count=0
localStorage.setItem('count',count)
 spnCount.innerHTML=count

}
if(localStorage.getItem('email')!==null){
  userinfo.style.display='flex'
  username.innerHTML=` ${localStorage.getItem('firstName')} ${localStorage.getItem('secondName')}`
}
function showAllProducts(data=chosenproducts){
  let price=0
  let elements=data.map((item,index)=>{
     price+=item.count*parseInt(item.price)
    return   `
    <div class=" content3  mt-4 card p-1 pb-4 d-flex flex-row">
        <img style='height:130px;width:130px;transform:translatey(40%)' class='ps-sm-4 ' src=${item.src} alt="" />
        <div class="mt-4 ms-3 me-2 " >
          <h6 class="">${item.title}</h6>
          <p >price : ${item.price}</p>
          <p >category :${item.category}</p>
          <div>
            <div class='d-flex gap-1 mb-3'>
        <span class=' border border-4 dec' onclick=decrement(${item.id})>-</span>
        <span  id='${item.id}'>${item.count}</span>
        <span class=' border border-4 increment'  onclick=increment(${item.id})>+</span>
        </div>
          <button onclick="removeToCard(${item.id})" style="padding: 8px 11px; outline:none; border:0;white-space:nowrap" class="ms-2 rounded-2 removeBtn">Remove from card</button>
        </div>
          </div>
      </div>
    `
  })
  // localStorage.setItem('price',price)
  totalprice.innerHTML= 'Total Price : '+price+' LE'
  addedToCard.innerHTML=elements.join('')
  if(addedToCard.innerHTML===''){
  totalprice.remove()
}
}
function removeToCard(i){
    let index=chosenproducts.findIndex((item)=>item.id===i)
    count-=chosenproducts[index].count;
 localStorage.setItem('count',count)
spnCount.innerHTML=count
     chosenproducts.splice(index, 1);
     localStorage.setItem('chosenproducts', JSON.stringify(chosenproducts));
    showAllProducts(chosenproducts)

}
function increment(i){
    
let index=chosenproducts.findIndex((item)=>item.id===i)
chosenproducts[index].count++;
count++
  localStorage.setItem('count',count)
spnCount.innerHTML=count
showAllProducts(chosenproducts)

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
    showAllProducts(chosenproducts)


}


function showFavs (FavArray){
  favContainet.innerHTML = ''
FavArray.forEach((item)=>
  favContainet.innerHTML+= `
    <div class=" contentFav mt-5 mb-4 card p-0 pb-4 rounded-2">
        <img style="  height: 200px;
  width: 100%" src=${item.src} class='rounded-2' alt="" />
        <div class="mt-3 " >
          <h6 class="text-center">${item.title}</h6>
         
          <p class="text-center">category :${item.category}</p>
          <div class="text-center">
            <i style="color:red;font-size:22px" onclick=deleteFav(${item.id})  class="fas fa-heart icon" style='font-size:20px'></i>
        </div>
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

//  price+=item.count*parseInt(item.price)
//    totalprice.innerHTML= 'Total Price : '+price+' LE'
// count=0
// localStorage.setItem('count',count)
// spnCount.innerHTML=count