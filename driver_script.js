import { Tree } from "./bst.js"

// 1-) 100 den küçük sayılarla istenilen uzunlukta rastgele dizi yaratmak için fonksiyon
const randomArrGenerator = function(length) {
    const arr = []

    for (let i = 0; i < length; i++) {
        let randomNumber = Math.floor(Math.random() * 101)
        arr.push(randomNumber)
    }

    return arr.sort((a,b) => a - b)
}

// 2-) Rastgele balanced bir ağaç oluştur
const arr1 = randomArrGenerator(10)
const tree1 = new Tree(arr1)

//console.log(arr1)
//console.log(tree1.isBalanced())

// 3-) Ağaçtaki tüm elemanları level, pre, post ve inorder ile console'a bas

/* tree1.levelOrderForEach((node) => console.log(node.data))
tree1.preOrderForEach((node) => console.log(node.data))
tree1.postOrderForEach((node) => console.log(node.data))
tree1.inOrderForEach((node) => console.log(node.data)) */

// 4-) Ağaca bir kaç tane 100'den büyük eleman ekleyip unbalanced duruma getir

tree1.insert(120)
tree1.insert(121)
tree1.insert(122)
tree1.insert(123)
tree1.insert(124)
tree1.insert(125)

// 5-) Ağacın unbalanced olup olmadığını kontrol et

console.log(tree1.isBalanced())

// 6-) Rebalance ile ağacı tekrar balanced duruma getir

tree1.rebalance()

// 7-) Ağacın tekrardan balanced durumda olup olmadığını kontrol et

console.log(tree1.isBalanced())