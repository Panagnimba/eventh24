export const state = ()=>({
    showRightSideMenu:false,
    showEventPopup:false,
    user:{
        lastName:"Josué",
        email:"panagnimba@gmail.com",
        phone:"+212645973449"
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
    }
}
