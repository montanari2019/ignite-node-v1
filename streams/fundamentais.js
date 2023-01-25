//  process.stdin.pipe(
//     process.stdout
//  ) 

import { Readable, Writable, Transform } from "node:stream"

class OneToHundredStream extends Readable{
   index =1

   _read(){
      const i = this.index++

      setTimeout(()=>{
         if(i > 100){
            this.push(null)
         }else{
            const buf = Buffer.from(String(1))
            this.push(buf)
         }

      },500)
   }
}

class NumberInverseStream extends Transform{
   _transform(chunk, enconding, callback){
      const transformed = Number(chunk.toString()) * -1
      callback(null, Buffer.from(String(transformed)))

   }
}

class MultiplayByTenStream extends Writable{
   _write(chunk, enconding, callback){
      console.log(Number(chunk.toString()) * 10)
      callback()
   }
}

new OneToHundredStream()
   .pipe(new NumberInverseStream())
   .pipe(new MultiplayByTenStream())