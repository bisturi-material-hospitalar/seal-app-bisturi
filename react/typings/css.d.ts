declare module '*.css' {
  type Styles = {
    [selector: string]: string
  }

  const css: Record<string, any>
  export default css
}
