// minheap[n,e,b,c,e,r,t,a] 0-index based
//         0 1 2 3 4 5 6 7
// parent equation: children: (i-1) / 2
// left child: 2i + 1
// right child: 2i + 2

export class MinHeap<T> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number) {
    this.compare = compareFn;
  }

  size(): number { return this.heap.length; }

  insert(item: T): void {
    if (!item) { console.log("invalid insert"); throw new Error("Invalid element to insert"); }
    this.heap.push(item);
    this.bubbleUp();
  }

  pop(): T | undefined {
    let retNode: T | undefined = undefined;

    if (this.size() === 0) { return undefined; }

    retNode = this.bubbleDown();

    return retNode;
  }


  bubbleUp() {
    let curIdx = this.size() - 1;
    let parentIdx: number = this.getParent(curIdx);

    if (curIdx === 0 || parentIdx < 0) { return; }

    let insertedNode: T = this.heap[curIdx];
    let parentIdxNode: T = this.heap[parentIdx];

    let ret: number = 0;
    // track child and parentIdx node on each swap
    // console.log("Accessing these nodes: ", insertedNode, parentIdxNode);
    while ((ret = this.compare(parentIdxNode, insertedNode)) > 0 && parentIdx >= 0) {

      // set a temp node pointed at what we just inserted
      const temp: T = insertedNode;

      // swap the two nodes
      this.heap[curIdx] = parentIdxNode;
      this.heap[parentIdx] = temp;

      // update indexes
      curIdx = parentIdx;
      parentIdx = this.getParent(curIdx);

      // update pointed to nodes 
      if (parentIdx >= 0) {
        insertedNode = this.heap[curIdx];
        parentIdxNode = this.heap[parentIdx];
      }
    }
  }


  /**
   * BubbleDown will take the last item in array and replace with root
   *  Root will be passed back to the custom heap pop
   *  we will then take the current root item and compare the two children 
   *  returning the index of the smaller child
   *  we then compare the root with the smaller child
   *  if the root is bigger we will swap root with smaller child.
   * @returns Item popped
   */
  bubbleDown(): T | undefined {
    // swap last item and root, then pop
    const lastIdx = this.size() - 1;
    const lastItemTemp = this.heap[lastIdx];

    // this.heap[lastIdx] = this.heap[0];
    this.swap(0, lastIdx);
    // this.heap[0] = lastItemTemp;
    const ret = this.heap.pop();
    // set up for loop
    let rootIdx = 0;
    let left = this.getLeft(rootIdx);
    let right = this.getRight(rootIdx);
    let detSwap = this.determineSwap(left, right); // gives back the smaller child idx or null if no child

    // loop while we have children to compare and swap with
    while (detSwap !== null) {
      // compare root and child, if root is bigger than the child, swap.
      const isRootBigger = this.compare(this.heap[rootIdx], this.heap[detSwap]);
      // if the root is bigger swap, otherwise stop looping
      if (isRootBigger > 0) {
        // if root is bigger than child swap
        this.swap(rootIdx, detSwap);
        // update the root to the swapped idx, calc the left and right idx's
        rootIdx = detSwap;
        left = this.getLeft(rootIdx);
        right = this.getRight(rootIdx);
        detSwap = this.determineSwap(left, right); // gives back the smaller child idx or null if no child
      }
      else { // when our root is smaller than the children we setup loop exit
        detSwap = null;
      }
    }

    return ret;
  }
  // returns the smaller index of the two children nodes for bubble down
  determineSwap(leftIdx: number, rightIdx: number): number | null {
    const left = this.heap[leftIdx];
    const right = this.heap[rightIdx];

    if (left && !right) { return leftIdx; }
    if (right && !left) { return rightIdx; }
    if (!left && !right) { return null; }

    let ret: number = this.compare(left, right);

    // left - right, if left = -left => right was bigger
    // left = +left => left was bigger
    if (ret >= 0) {
      return rightIdx; // right is smaller bcs left is bigger
    } else {
      return leftIdx; // left is smaller bcs right is bigger
    }
  }

  swap(parentIdx: number, childIdx: number): void {
    // save the parentIdx item, overwrite the parentIdx 
    // with child item overwrite childIdx with saved parent item
    const temp: T = this.heap[parentIdx];
    this.heap[parentIdx] = this.heap[childIdx];
    this.heap[childIdx] = temp;
  }
  getLeft(curIdx: number): number {
    return (2 * curIdx) + 1;
  }

  getRight(curIdx: number): number {
    return (2 * curIdx) + 2;
  }

  getParent(curIdx: number): number {
    return Math.floor((curIdx - 1) / 2);
  }
  toString() {
    return this.heap;
  }

}
