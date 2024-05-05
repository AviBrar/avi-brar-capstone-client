function LoginValidation(userName, password) {
  let errors = {};
  const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const password_pattern = /^[a-zA-Z0-9]{6,}$/;

  if (!userName.trim()) {
    errors.userName = "Username required";
  } else if (!email_pattern.test(userName)) {
    errors.userName = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password required";
  } else if (!password_pattern.test(password)) {
    errors.password = "Password needs to be at least 6 characters";
  }

  return errors;
}

export default LoginValidation;
