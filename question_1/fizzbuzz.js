for (let i = 1; i <= 100; i++) {
  // Loop through numbers from 1 to 100
  console.log(
    i % 3 === 0 ? (i % 5 === 0 ? "FizzBuzz" : "Fizz") : i % 5 === 0 ? "Buzz" : i
  ); // Ternary operator to check if i is divisible by 3, 5 or both and print the result accordingly
  /**
   * Explanation:
   * The code uses a for loop to iterate through numbers from 1 to 100.
   * i % 3 === 0: This checks if i is divisible by 3. If it is, it proceeds to the next operation, otherwise it checks if i is divisible by 5.
   * i % 5 === 0 ? "FizzBuzz" : "Fizz"): If i is divisible by 3, it then checks if i is also divisible by 5. If it is, it returns "FizzBuzz", otherwise it returns "Fizz".
   * i % 5 === 0 ? "Buzz" : i: If i is not divisible by 3, it checks if i is divisible by 5. If it is, it returns "Buzz", otherwise it returns i.
  */
}
