export default function (
  state = {
    isMobile: false,
    isBot: false,
  },
  action: any
) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
