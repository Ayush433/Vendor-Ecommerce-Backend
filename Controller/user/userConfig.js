module.exports = {
  validationMessage: {
    nameRequired: "I think you missed the Name field!",
    nameInvalidLength: "Sorry, Name must be at least 5 characters",
    designationInvalid: "Sorry, Designation must be a valid value!",
    emailInvalid: "I think Email is Invalid!",
    emailRequired: "Sorry, you missed the Email!",
    Email: "Email Not Found",
    passwordInvalidLength:
      "Sorry, Password must be minimum 6 characters and maximum 30 characters!",
    passwordRequired: "Sorry, Password is required!",
    password2Required: "Please, reenter the Password",
    passwordMismatch: "Sorry, your passwords do not match!",
    stateInvalid: "Sorry, State is invalid!",
    districtInvalid: "Sorry, District is invalid!",
    vdcInvalid: "Sorry, VDC/Municipality is invalid!",
    emailExists: "I am sure,that Email already exists!",
    rolesInvalid: "Sorry, the Role you selected is invalid!",
    rolesRequired: "Sorry, you missed the roles field!",
    userOrCompanyRequired:
      "Please select at least one between company and user for subscription",
    passwordChange: "Password Changed Successfully",
  },
  validate: {
    empty: "This field is required",
    invalid: "Invalid entry",
    isNotNumber: "Invalid. Must be only numbers",
    isEmail: "Please enter Valid Email",

    isMongoId: "This is not mongo id",
    isEightChar: "The password must be at least 8 character",
    invalidInput: "invalid input",
    nameLength: "This field should be between 2 to 100",
    isDate: "This field must contain Date.",
    passLength:
      "password must be at least 6 characters, max limit 30 characters",
    bioLength: "length of bio should be between 5 to 500",
    skillLength: "length of skill should be between 5 to 400",
    emailLength: "length of email should be between 5 to 100",
    pwLength: "length of password should be at least 6 characters",
    isEqual: "Password does not match",
    isGender: "Provide valid gender",
    noGender: "Please select your gender",
    invalidLength: "Please select Referal code between 6 to 8 length",
    isPhone: "Invalid phone no.",
  },
  save: "User data saved successfully!",
  notfound: "User Not Found",
  delete: "User data deleted successfully!",
  get: "User data obtained successfully!",
  server: "Internal Server Error",
  gets: "Users data obtained successfully!",
  registerUser:
    "User Register Successfully, Use verification code sent to your email to verify email.",
  registerAdmin: "User Register Successfully.",
  emailVerify: "Email Verified Successful",
  subscribeFail: "Subscription failed",
  notauthorized: "Not Authorized",
  alverified: {
    message: "Already verified. You can log in",
    is_verified: true,
  },
  alregistered: {
    message:
      "Email/phone already registered. Check your mail or sms for verification code.",
    is_verified: false,
  },
  regnotverifed: {
    message:
      "Email/mobile no not verified. Please check your mail or otp message.",
    is_verified: false,
  },
};
