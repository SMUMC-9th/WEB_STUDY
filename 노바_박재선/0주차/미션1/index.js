const topMenus = document.querySelectorAll(".menu a");

topMenus.forEach((item)=>{
    item.addEventListener('click', ()=>{
        topMenus.forEach((e)=>e.classList.remove('active'));
        item.classList.add('active');
    })
})

const sideMenus = document.querySelectorAll(".sidebar a");
sideMenus.forEach((item)=>{
    item.addEventListener("click", () => {
        sideMenus.forEach((e)=>e.classList.remove('active'));
        item.classList.add('active');
    })
})