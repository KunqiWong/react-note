export function randomColor(): string {
  return Array(6)
    .fill(1)
    .reduce((v) => {
      return v + (~~(Math.random() * 16)).toString(16)
    }, '#')
}
