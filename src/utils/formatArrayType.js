export const handleFormatArrType = (arr) => {
    let result = []
    arr.forEach(item => {
        item.size.forEach(sizeItem => {
            result.push({ type: item.type, size: sizeItem.size, quantity: sizeItem.quantitySize })
        })
    })
    return result
}

