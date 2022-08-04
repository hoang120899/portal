export default function useGetBoundingClientRect(element) {
  return element?.getBoundingClientRect() || {}
}
