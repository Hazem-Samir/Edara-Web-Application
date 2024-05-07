const bcrypt=require('bcrypt')

let f=async ()=>{
  console.log (await bcrypt.hash("password", 10))
}
f()