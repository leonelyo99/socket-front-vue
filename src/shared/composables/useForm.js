const useForm = (initialState, validations) => {
    const [values, setValues] = useState(initialState)
    
    const reset = ()=>{
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    return {
    }
}

export default useForm