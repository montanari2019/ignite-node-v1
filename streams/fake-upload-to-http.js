import { Readable, Duplex } from "node:stream"

class OneToHundredStream extends Duplex{
   index = 1

   _read(){
      const i = this.index++

      setTimeout(()=>{
         if(i > 5){
            this.push(null)
         }else{
            const buf = Buffer.from(String(1))
            this.push(buf)
         }

      },1000)
   }
}

fetch('http://localhost:3334',{
    method: 'POST',
    body: new OneToHundredStream(),
}).then(response =>{
      return response.text()
}).then(data =>{
   console.log(data)
})