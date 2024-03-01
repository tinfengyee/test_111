function useDraggable(options) {
  const {
    handle: draggingHandle = target,
  } = options
  console.log(draggingHandle)
  

}

useDraggable({
  handle: 'd'
})