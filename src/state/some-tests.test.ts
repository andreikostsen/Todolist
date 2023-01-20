// export const sum=(a:number,b:number,c:number) => {
//
//     a = 10
//
//     return a+b+c
//
// }
//
//
// test("calculate sum", ()=>{
//
//     expect(sum(1,2,3)).toEqual(6)
//
// })


export let a:number
let b:number
let c:number



const sum=(a:number,b:number,c:number) => {

      return a+b+c

}

beforeEach(()=>{
        a = 1
        b = 2
        c = 3
    }

)



test("correct sum", ()=>{

    const result = sum(a,b,c)

    expect(result).toBe(6)

})

test("correct sum", ()=>{

    c = 5

    const result = sum(a,b,c)

    expect(result).toBe(8)

})




