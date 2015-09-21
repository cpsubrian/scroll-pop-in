function createThrottledEvent (type, name, obj = window) {
  var running = false
  var func = () => {
    if (running) { return }
    running = true
    window.requestAnimationFrame(() => {
      obj.dispatchEvent(new window.CustomEvent(name))
      running = false
    })
  }
  obj.addEventListener(type, func)
  return func
}

export default createThrottledEvent
