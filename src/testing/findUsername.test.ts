import findUsernameFromID from "../utils/find-username-from-id copy";

const testArrOne= [ 
    {
    id: 1,
    username: 'DidWazHere',
    isFaculty: false
    },
    {
        id:2,
        username: 'GrakeGetsGainz',
        isFaculty: true,
    }
]

test("username from id", () => {
       expect(findUsernameFromID(1, testArrOne)).toBe('DidWazHere')  
 })

 test("username from id", () => {
    expect(findUsernameFromID(6, testArrOne)).toBe(undefined)  
})