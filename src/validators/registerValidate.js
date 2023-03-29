export default function registerValidate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = "Required";
    } else if (values.username.includes(" ")) {
        errors.username = "Invalid Username...!"
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // validation for password
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater then 8 and less then 20 characters long";
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password";
    }

    // validate confirm password
    if (!values.confPassword) {
        errors.confPassword = "Required";
    } else if (values.password !== values.confPassword) {
        errors.confPassword = "Password Not Match...!"
    } else if (values.confPassword.includes(" ")) {
        errors.confPassword = "Invalid Confirm Password"
    }

    return errors;
}