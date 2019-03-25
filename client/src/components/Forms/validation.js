export default function validate(input, name) {
  if (name === "text") {
    return input.length >= 1 && input.length < 50 && !input.match(/ /);
  }
  if (name === "password") {
    return (
      input.length >= 6 &&
      input.length < 24 &&
      input.match(/[A-Z]/) &&
      input.match(/[0-9]/) &&
      !input.match(/ /)
    );
  }
  if (name === "email") {
    const em = new RegExp(
      /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    );

    return input.length > 6 && input.length < 50 && em.test(input);
  }
}
