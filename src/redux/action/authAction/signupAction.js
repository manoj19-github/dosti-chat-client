import axios from "axios"

export const signupAction=async(regData)=>{
  try{
    const formData=new FormData()
    formData.append("name",regData.name)
    formData.append("email",regData.email)
    formData.append("password",regData.password)
    if(regData.pic){
      if(regData.pic.type && (regData.pic.type !== "image/jpeg" || regData.pic.type !== "image/jpg" ||
       regData.pic.type !== "image/png")){
        alert("please select jpg,jpeg or png format image")
        return
      }
      formData.append("pic",regData.pic)
    }

    const {data}=await axios({
      method:"post",
      data:formData,
      url:"/api/user/register",
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    return data
  }catch(err){
    console.log(`error in signup data`,err)
  }
}
