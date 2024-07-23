import { z } from "zod";


function validateName(name) {
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    return nameRegex.test(name);
}

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;

//chat gpt

// function validatePassword(password) {
//   return passwordRegex.test(password);
// }

// Test cases
// console.log(validatePassword("Abcde1!"));    // true
// console.log(validatePassword("Abc1!"));      // true
// console.log(validatePassword("Abcde!"));     // false (no number)
// console.log(validatePassword("Abcde1"));     // false (no special character)
// console.log(validatePassword("abc1!"));      // true (case insensitive letters allowed)
// console.log(validatePassword("Ab1!"));       // false (less than 5 characters)

//chat gpt


const user_register_schema = z.object({
    email: z.string().email(),
    name: z.string().min(3).refine(validateName, {message:"invalid name"}),
    password: z.string().min(8),
})


const user_login_schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export {user_login_schema};
export {user_register_schema};