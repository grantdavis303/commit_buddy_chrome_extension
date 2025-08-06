export function storeRandomValue(val: string) {
  if (window.sessionStorage.getItem('randVal') == null) {
    window.sessionStorage.setItem('randVal', val.toString())
  }
}