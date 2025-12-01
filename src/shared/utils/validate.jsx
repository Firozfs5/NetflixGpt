export const checkValidData = (email, password, name) => {
  console.log(email, password, name);
  let nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name);
  if (!name) {
    console.log("name end");
    return "Enter name";
  }
  if (!nameRegex) return "Name is not Valid";

  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(
    email
  );
  if (!email) return "Enter Email";
  if (!emailRegex) return "Email is not Valid";

  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%_*?&#]{5,20}$/.test(
      password
    );
  if (!password) return "Enter Password";
  if (!passwordRegex) return "Password is not Valid";

  return null;
};
