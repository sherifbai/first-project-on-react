function Button({ children, version, isDisabled, type }) {
    return (
        <button type={ type } disabled={ isDisabled } className={`btn btn-${version}`}>
            { children }
        </button>
    );
}

Button.defaultProps = {
    type: 'submit',
    isDisabled: false,
    version: 'primary'
}

export default Button;
