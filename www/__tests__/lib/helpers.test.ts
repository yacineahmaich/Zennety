import { getFirstApiErrorMsg } from "@/lib/helpers";

describe("Lib - helpers", function () {
  describe("__getFirstApiErrorMsg()", function () {
    it("Should return the first api validation error", function () {
      const excpected = "name is already taken";

      const result = getFirstApiErrorMsg({
        errors: {
          name: [excpected, "name should be at least 4 characters"],
          email: ["email field is required", "invalid email format"],
        },
        message: "Something went wrong",
      });

      expect(result).toBe(excpected);
    });

    it("Should return message attribute when there is no validation errors", function () {
      const excpected = "Something went wrong";

      const result = getFirstApiErrorMsg({
        errors: {
          email: [],
        },
        message: excpected,
      });

      expect(result).toBe(excpected);
    });
  });
});
