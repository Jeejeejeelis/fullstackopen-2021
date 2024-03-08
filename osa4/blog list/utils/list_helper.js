const dummy = (blogs) => {
    // ... return 1 cause it was creating issues.
    return 1
    }

//4.4 
const totalLikes = (blogs) => {
    //Iterate through blogs and return sum of likes!
    let sum = 0;
    for(let i = 0; i < blogs.length; i++) {
        sum += blogs[i].likes;
    }
    return sum;
}
module.exports = {
    dummy,
    totalLikes
    }

// Course file for_testing.js
// const reverse = (string) => {
//     return string
//         .split('')
//         .reverse()
//         .join('')
//     }
    
//     const average = (array) => {
//     const reducer = (sum, item) => {
//         return sum + item
//     }
    
//     return array.reduce(reducer, 0) / array.length
//     }
    
//     module.exports = {
//     reverse,
//     average,
//     }