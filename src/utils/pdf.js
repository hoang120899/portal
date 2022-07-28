// https://stackoverflow.com/questions/11415665/save-base64-string-as-pdf-at-client-side-with-javascript
export const base64toBlob = (data) => {
  const sliceSize = 512
  data = data.replace(/^[^,]+,/, '')
  data = data.replace(/\s/g, '')
  const byteCharacters = window.atob(data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: 'application/pdf' })
}
