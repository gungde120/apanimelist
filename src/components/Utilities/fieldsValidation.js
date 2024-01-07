const fieldValidation = (data) => {
    for (const key in data) {
        if (!data[key]) {
            return true; // At least one field is empty
        }
    }
    return false; // All fields are filled
}

export default fieldValidation