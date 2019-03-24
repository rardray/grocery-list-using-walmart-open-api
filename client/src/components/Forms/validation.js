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
    const suffixes = [".com", ".net", ".org", ".biz", ".edu"];
    function matchSuff() {
      const matches = suffixes.map(e => {
        if (!input.match(e)) {
          e = false;
        } else {
          return e;
        }
      });
      var newOne = matches.filter(e => e !== undefined);
      if (newOne.length === 1) {
        return newOne.toString();
      }
    }
    return (
      input.length > 6 &&
      input.length < 50 &&
      matchSuff() &&
      input.match("@") &&
      input.indexOf("@") + 1 < input.indexOf(matchSuff()) &&
      input.indexOf("@") > 1 &&
      input.indexOf(matchSuff()) === input.length - 4 &&
      !input.match(/ /)
    );
  }
}
