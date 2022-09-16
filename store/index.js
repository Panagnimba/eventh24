export const state = ()=>({
    showRightSideMenu:false,
    showEventPopup:false,
    user:{
        lastName:"Josué",
        email:"panagnimba@gmail.com",
        phone:"+212645973449"
    },
    admin:{
        isAuthenticated:false,
        token:null
    },
    eventList:[],
    panier:[]
})

export const mutations={
    toggleRightSideMenu(state){
        state.showRightSideMenu = !state.showRightSideMenu
    },
    //the popup display on the event description page
    //when clicking on buy now button
    toggleEventPopup(state,val){
        state.showEventPopup = val
    },
    authenticateAdmin(state,val){
        state.admin = val
    },
    fillEventList(state,list){
        state.eventList = list
    },
    fillEPanier(state,event){
        let isPresent = false
        state.panier.forEach((item ,i)=> {
            if(item._id == event._id){
                isPresent = true
                state.panier.splice(i,1) // delete and repush the new
                state.panier.push(event)
            }
        });
        if(!isPresent) //not present
        state.panier.push(event)
    },
    removeToCart(state,itemId){
        state.panier.forEach((item,i)=>{
            if(item._id == itemId){
                state.panier.splice(i,1) // delete to the cart list
            }
        })
    }
    ,
    increaseQte(state,itemId){
        state.panier.forEach(item=>{
            if(item._id == itemId){
                item.qte++;
            }
        })
    },
    decreaseQte(state,itemId){
        state.panier.forEach(item=>{
            if(item._id == itemId && item.qte >= 2){
                item.qte--;
            }
        })
    },
    modifyQte(state,panierItem){
        state.panier.forEach(item=>{
            if(item._id == panierItem.id){
                if( panierItem.qte > 0)
                    item.qte = panierItem.qte
                else
                    item.qte = 1
            }
        })
    },
}
