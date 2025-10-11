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