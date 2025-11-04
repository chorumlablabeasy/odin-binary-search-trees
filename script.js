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

      while (successor.left) {
        successorParent = successor
        successor = successor.left
      }

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