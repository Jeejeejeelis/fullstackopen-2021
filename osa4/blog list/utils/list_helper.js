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
    for(let i = 0; i < blogs.length; i++) {
        if(blogs[i].likes > favorite.likes) {
            favorite = blogs[i];
        }
    }
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    };
}
//4.6*
const mostBlogs = (blogs) => {
    // check if blogs is empty
    if(blogs.length === 0) {
        return null;
    }
    let authorsOfBlogs = blogs.map(blog => blog.author);
    //Set automatically removes duplicates!
    let uniqueAuthors = [...new Set(authorsOfBlogs)];

    let authorBlogCounts = uniqueAuthors.map(uniqueAuthor => {
        return {
            author: uniqueAuthor,
            blogs: 0
        };
    });
    // Iterate through blogs and add blog count if a blog with the authors name is found!
    for(let i = 0; i < blogs.length; i++) {
        for(let j = 0; j < authorBlogCounts.length; j++){
            if (authorBlogCounts[j].author == blogs[i].author) {
                authorBlogCounts[j].blogs++;
            }
        }    
    }
    let mostBlogs = 0
    let mostAuthor = ""
    for(let i = 0; i < authorBlogCounts.length; i++) {
        if(authorBlogCounts[i].blogs >= mostBlogs){
            mostBlogs = authorBlogCounts[i].blogs
            mostAuthor = authorBlogCounts[i].author
        }
    }

    // returned format!
    return {
        author: mostAuthor,
        blogs: mostBlogs
    };
}
//4.7* almost copy paste of 4.6*
const mostLikes = (blogs) => {
    // check if blogs is empty
    if(blogs.length === 0) {
        return null;
    }
    let authorsOfBlogs = blogs.map(blog => blog.author);
    //Set automatically removes duplicates!
    let uniqueAuthors = [...new Set(authorsOfBlogs)];

    let authorLikeCount = uniqueAuthors.map(uniqueAuthor => {
        return {
            author: uniqueAuthor,
            likes: 0
        };
    });
    // Iterate through blogs and add likes if a blog with the authors name is found!
    for(let i = 0; i < blogs.length; i++) {
        for(let j = 0; j < authorLikeCount.length; j++){
            if (authorLikeCount[j].author == blogs[i].author) {
                authorLikeCount[j].likes += blogs[i].likes;
            }
        }    
    }
    let mostLikes = 0
    let mostAuthor = ""
    for(let i = 0; i < authorLikeCount.length; i++) {
        if(authorLikeCount[i].likes >= mostLikes){
            mostLikes = authorLikeCount[i].likes
            mostAuthor = authorLikeCount[i].author
        }
    }

    // returned format!
    return {
        author: mostAuthor,
        likes: mostLikes
    };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
    }