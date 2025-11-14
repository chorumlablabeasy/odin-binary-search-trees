class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr)
  }

  insert(value) {
    const newNode = new Node(value)
    let currentNode = this.root

    // Ağaç boşsa eklenmek istenen elemanı ağacın kökü yap ve çık
    if (!currentNode) {
      this.root = newNode
      return
    }

    while (currentNode !== null) {

      // Eklenmek istenen eleman ağaçta varsa eklemeden çık
      if (value === currentNode.data) {
        return
      }

      // Ağaçta gez ve elemanı gerekli yere ekle
      if (value < currentNode.data) {
        if (currentNode.left) {
          currentNode = currentNode.left
        } else {
          currentNode.left = newNode
          return
        }
      } else {
        if (currentNode.right) {
          currentNode = currentNode.right
        } else {
          currentNode.right = newNode
          return
        }
      }
    }
  }

  deleteItem(value) {
    let currentNode = this.root
    let prevNode = null

    // Ağaç boşsa çık
    if (!currentNode) {
      return
    }

    // Silmek istenen değeri ağaçta ara
    while (value !== currentNode.data && currentNode !== null) {
      if (value < currentNode.data) {
        prevNode = currentNode
        currentNode = currentNode.left
      } else {
        prevNode = currentNode
        currentNode = currentNode.right
      }
    }

    // Değer bulunamadıysa çık
    if (!currentNode) {
      return
    }

    // 1.Durum: Silmek istenen değerin hiç çocuğu yoksa
    if (!currentNode.left && !currentNode.right) {

      // a) Silmek istenen değer ağacın kökü
      if (!prevNode) {
        this.root = null
        return
      }

      // b) Silmek istenen değer ağacın kökü değil
      if (currentNode.data < prevNode.data) {
        prevNode.left = null
        return
      } else {
        prevNode.right = null
        return
      }
    }

    // 2.Durum: Silmek istenen değer tek çocukluysa
    if ((currentNode.left && !currentNode.right) || (currentNode.right && !currentNode.left)) {
      
      // a) Silmek istenen değer ağacın kökü
      if (!prevNode) {
        if (currentNode.left) {
          this.root = currentNode.left
          return
        } else {
          this.root = currentNode.right
          return
        }
      }

      // b) Silmek istenen değer ağacın kökü değil
      // Silmek istenen eleman prevNodu'un sol çocuğuysa
      if (currentNode.data < prevNode.data) {
        if (currentNode.left) {
          prevNode.left = currentNode.left
          return
        } else {
          prevNode.left = currentNode.right
          return
        }
      }
      // Silmek istenen eleman prevNodu'un sağ çocuğuysa
      else {
        if (currentNode.left) {
          prevNode.right = currentNode.left
        } else {
          prevNode.right = currentNode.right
        }
      }
    }

    // 3.Durum: Silmek istenen eleman iki çocukluysa
    if (currentNode.left && currentNode.right) {
      let successor = currentNode.right
      let successorParent = currentNode

      // Ağaçta gez ve successor elemanı bul
      while (successor.left) {
        successorParent = successor
        successor = successor.left
      }

      // Successor elemanın ebeveyni currentNode'a eşitse successor currentNodu'un sağ çocuğudur
      if (successorParent === currentNode) {
        currentNode.data = successor.data
        currentNode.right = successor.right
        return
      } else {
        currentNode.data = successor.data
        successorParent.left = successor.right
        return
      }
    }
  }

  find(value) {
    let currentNode = this.root

    // İstenen değere sahip node'u bul
    while (currentNode && currentNode.data !== value) {
      if (value < currentNode.data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }

    if (currentNode) {
      return currentNode
    } else {
      return false
    }
  }

  levelOrderForEach(callback) {

    // callback parametresi tanımlı mı ve bir fonksiyon mu ?
    if (typeof callback !== "function") {
      throw new Error("levelOrderForEach metodu için bir callback fonksiyonu gereklidir.")
    }

    // Ağacın kökü yoksa yani ağaç boşsa çık
    if (!this.root) {
      return
    }

    const queue = []

    queue.push(this.root)

    while(queue.length !== 0) {
      let currentNode = queue.shift()
      callback(currentNode)
      
      if (currentNode.left) {
        queue.push(currentNode.left)
      } 
      if (currentNode.right) {
        queue.push(currentNode.right)
      }
    }
  }

  preOrderForEach(callback) {

    // callback parametresi tanımlı mı ve bir fonksiyon mu ?
    if (typeof callback !== "function") {
      throw new Error("levelOrderForEach metodu için bir callback fonksiyonu gereklidir.")
    }

    // Ağacın kökü yoksa yani ağaç boşsa çık
    if (!this.root) {
      return
    }

    const preOrderRecur = (node) => {

      if (node === null) {
        return
      }

      callback(node)

      preOrderRecur(node.left)
      preOrderRecur(node.right)
    }

    preOrderRecur(this.root)
  }

  inOrderForEach(callback) {

    // callback parametresi tanımlı mı ve bir fonksiyon mu ?
    if (typeof callback !== "function") {
      throw new Error("levelOrderForEach metodu için bir callback fonksiyonu gereklidir.")
    }

    // Ağacın kökü yoksa yani ağaç boşsa çık
    if (!this.root) {
      return
    }

    const inOrderRecur = (node) => {

      if (node === null) {
        return
      }

      inOrderRecur(node.left)
      callback(node)
      inOrderRecur(node.right)
    }

    inOrderRecur(this.root)
  }

  postOrderForEach(callback) {

    // callback parametresi tanımlı mı ve bir fonksiyon mu ?
    if (typeof callback !== "function") {
      throw new Error("levelOrderForEach metodu için bir callback fonksiyonu gereklidir.")
    }

    // Ağacın kökü yoksa yani ağaç boşsa çık
    if (!this.root) {
      return
    }

    const postOrderRecur = (node) => {

      if (node === null) {
        return
      }

      postOrderRecur(node.left)
      postOrderRecur(node.right)
      callback(node)
    }

    postOrderRecur(this.root)
  }

  height(value) {
    let currentNode = this.root

    // Uzunluğu hesaplanacak değeri bulma
    while (currentNode && currentNode.data !== value) {
      if (value < currentNode.data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }

    // Değer ağaçta yoksa null dön
    if (!currentNode) {
      return null
    }

    // Uzunluğu hesaplanacak değerin sağ ve sol çocuklarının uzunluğunu bul ve büyük olanı dön
    const heightRecur = (node) => {

      if (!node) {
        return -1
      }

      const leftHeight = heightRecur(node.left)
      const rightHeight = heightRecur(node.right)

      return 1 + Math.max(leftHeight, rightHeight)
    }

    return heightRecur(currentNode)
  }

  depth(value) {
    let currentNode = this.root
    let depthCount = 0

    // Değeri bulana kadar ağaçta gez ve depthCount 1 arttır
    while (currentNode && currentNode.data !== value) {
      if (value < currentNode.data) {
        currentNode = currentNode.left
        depthCount += 1
      } else {
        currentNode = currentNode.right
        depthCount +=1
      }
    }

    // Değer yoksa null dön değer bulunduysa derinliğini dön
    if (!currentNode) {
      return null
    } else {
      return depthCount
    }
  }

  isBalanced() {
    const root = this.root

    const isBalancedRecur = (node) => {

      // Durma koşulu: değer null ise -1 dön
      if (!node) {
        return -1
      }

      // Sağ ve sol ağacın yüksekliğini özyinelemeli olarak bul
      const leftHeight = isBalancedRecur(node.left)
      const rightHeight = isBalancedRecur(node.right)

      // Sağ veya sol ağaçtan eğer -2 değeri gelirse ağaçta bir dengesizlik bulunmuştur bundan dolayı hızlı bir şekilde fonksiyondan çıkmak gerekir
      if (leftHeight === -2 || rightHeight === -2) {
        return -2
      }

      // Ağaçların boy farkını bul
      const heightDifference = Math.abs(leftHeight - rightHeight)

      if (heightDifference > 1) {
        return -2
      } else {
        return 1 + Math.max(leftHeight, rightHeight)
      }
    }

    return isBalancedRecur(root) !== -2
  }

  rebalance() {

    // 1.Kısım: Düzleştirme 
    const sortedNodes = []

    this.inOrderForEach((node) => {
      sortedNodes.push(node.data)
    })

    // 2.Kısım: Yeniden inşa etme
    this.root = buildTree(sortedNodes)
  }
}

function buildTreeRecur(arr, start, end) {
  if (start > end) return null

  let mid = start + Math.floor((end - start) / 2)

  let root = new Node(arr[mid])

  root.left = buildTreeRecur(arr, start, mid-1)
  root.right = buildTreeRecur(arr, mid + 1, end)

  return root
}

function buildTree(arr) {
  let uniq = [... new Set(arr)]
  let sortedUniq = uniq.sort((a, b) => a - b)

  return buildTreeRecur(sortedUniq, 0, sortedUniq.length - 1)
}