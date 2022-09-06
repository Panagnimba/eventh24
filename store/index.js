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
    }
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
    }
}
