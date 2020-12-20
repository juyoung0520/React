import {useReducer, useCallback} from 'react';

function reducer(state, action) {
    switch(action.type) {
        case 'CHANGE':
            return {
                ...state,
                [action.name]: action.value
            };
        case 'RESET':
            return action.initialForm;
        default:
            throw new Error('Unhandled error');
    }
}

function useInputs(initialForm) {
    const [form, dispatcher] = useReducer(reducer, initialForm);

    const onChange = useCallback(e => {
        const {name, value} = e.target;
        dispatcher({
            type: 'CHANGE',
            name,
            value
        });
    }, []);

    const reset = useCallback(() => 
        dispatcher({
            type: 'RESET',
            initialForm
        }), [initialForm]);

    return [form, onChange, reset];
}

export default useInputs;