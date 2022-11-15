function getCookie(cookieName) {
    let value = null;
    document.cookie.split(";").forEach((e) => {
      if (e.includes(cookieName)) {
        value = e.split("=")[1];
      }
    });
    return value;
  }


  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }


  router.post("/saveNewEvent",async(req,res)=>{
    let serverName = req.protocol + '://' + req.get('host')
    let path = "./uploads/event"
    let data = req.body
      try{
         // ---------- define the image name --------------
              let myEvent = new Event(data) // event to save if id is null
              let imgName = ""
              if(req.body._id==null || req.body._id==undefined)
                imgName = myEvent._id
              else
                imgName = req.body._id
         // ---------- image saving on the server--------------
         if(data.img.includes('data:image')){
          imgName = `${imgName}.png`
          let Bgbase64Data = data.img.split(",")[1]
          fs.writeFileSync(`${path}/${imgName}`, Bgbase64Data, 'base64');
          myEvent.img = `${serverName}/event/${imgName}`
        }
  
        if(req.body._id==null || req.body._id==undefined){
          // ------------------------------------------  
            await myEvent.save()
            res.status(200).json({success:true,message:"Evènement Créé avec succès"})
          // ------------------------------------------
        }
        else{
          await Event.updateOne({_id:req.body._id},myEvent)
          res.json({success:true,message:"Evenement modifier avec succès"})
        }
      
        }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
      }
    
  })
  
  router.post('/saveBanner',async(req,res)=>{
    let serverName = req.protocol + '://' + req.get('host')
    let path = "./uploads/banner"
    let data = req.body
    try{
        // ---------- background image saving on the server--------------
          if(data.bgImage.includes('data:image')){
            let Bgbase64Data = data.bgImage.split(",")[1]
            fs.writeFileSync(`${path}/bg.png`, Bgbase64Data, 'base64');
            data.bgImage = `${serverName}/banner/bg.png`
          }
        // ------------------------------------------
        // ---------- Items images saving on the server -----------------
          data.items.forEach((item,i) => {
            if(item.img.includes('data:image')){
              let Itembase64Data = item.img.split(",")[1]
              fs.writeFileSync(`${path}/item-${i+1}.png`, Itembase64Data, 'base64');
              item.img = `${serverName}/banner/item-${i+1}.png`
            } 
            else
            {
              let decomp = item.img.split('/') //exemple ['http:', '', 'localhost:9000', 'banner', 'item-1.png']
              let it = decomp[decomp.length - 1] // get the last == image name (item-1.png)
              // 
              try{
                  if(fs.existsSync(`${path}/${it}`,'utf8')){
                    fs.renameSync( `${path}/${it}`, `${path}/item-${i+1}.png`)
                    item.img = `${serverName}/banner/item-${i+1}.png`
                    console.log("rename---------------------------")
                  }
                  else
                    data.items.splice(i, 1); // delete this element   
                }catch(e){
                 console.log(e.message)
                }
            }
          });
        // ----------- Now store data to the database----------
        //------------ Contening image path store in server----
        if(req.body._id==null || req.body._id==undefined)
        {
            let banner = new Banner(data)
            await banner.save()
            res.status(200).json({success:true,message:"Slider Créer avec succès"})
        }
        else
        {
          await Banner.updateOne({_id:req.body._id},{bgImage:data.bgImage,items:data.items})
          res.json({success:true,message:"Mise à jour du slider réussie"})
        }
    }catch(error){
      console.log(error.message)
      res.json({success:false,message:error.message})
    }
  })
  



  // 






// 


fetch(url)
.then(resp => resp.blob())
.then(blobobject => {
    const blob = window.URL.createObjectURL(blobobject);
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = blob;
    anchor.download = "name.png";
    document.body.appendChild(anchor);
    anchor.click();
    window.URL.revokeObjectURL(blob);
})
.catch(() => console.log('An error in downloadin gthe file sorry'));






// 

const { registerFont,createCanvas, loadImage } = require('canvas')
let fs = require('fs')
var path = require('path');
// 
let width = 1500;
let height = 500
// 
registerFont('lobster.ttf', { family: 'lobster' })
const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

ctx.font = 'bold 20pt lobster'

async function createTicket(Pevtimg,pqrcode,peventtitle,pheure,plieu,pnomclient){
  let image = await loadImage("ticketTemplate.png")
    await ctx.drawImage(image, 0, 0,width,height)
    // left event image
    let eventImage = await loadImage(Pevtimg)
      await ctx.drawImage(eventImage, 0, 0,200,height)
      
     let qrcode = await loadImage(pqrcode)
    
        ctx.fillStyle = '#f3f4f6'
        ctx.strokeStyle = '#f3f4f6'
 
        ctx.fillText(peventtitle, 210,40)
        
        ctx.strokeText(pheure, ((width+60)/2),(height/2))
    
        ctx.font = '10pt lobster'
        ctx.fillText(plieu, (width/2),(height-50))
        ctx.fillText(pnomclient, (width/2),(height-17))
    
        await ctx.drawImage(qrcode,(width-110),(height-110),100,100)
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync("./img.png",buffer)
        return await canvas.toDataURL('image/png')
}
createTicket('lenna.png','qrcode.png',"Floby en concert live des artistes","20h45","Stade municipa","Panagnimba")
module.exports = createTicket;