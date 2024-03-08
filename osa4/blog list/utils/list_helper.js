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
//4.5*
const favoriteBlog = (blogs) => {
    // check if blogs is empty
    if(blogs.length === 0) {
        return null;
    }

    let favorite = blogs[0];
    // find the last blog post with most likes. Only necessary to return 1 blog!
    for(let i = 1; i < blogs.length; i++) {
        if(blogs[i].likes > favorite.likes) {
            favorite = blogs[i];
        }
    }
// returned format!
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
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