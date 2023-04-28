function generateRandomAlphanum(length){
    const alphaNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    let generate = "";
    for(let i=0; i<length; i++){
        const index = Math.floor(Math.random() * alphaNum.length);
        generate += alphaNum[index];
    }
    return generate;
}

module.exports = {
    generateRandomAlphanum
};