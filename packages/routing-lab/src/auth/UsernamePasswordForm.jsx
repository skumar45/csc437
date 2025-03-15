import { useActionState } from "react";

export function UsernamePasswordForm() {
  const [result, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const username = formData.get("username");
      const password = formData.get("password");

      console.log("Submitted Username:", username);
      console.log("Submitted Password:", password);

      // Check if fields are empty
      if (!username || !password) {
        return { type: "error", message: "Please fill in your username and password." };
      }

      return { type: "success", message: "Form submitted successfully!" };
    },
    null
  );

  return (
    <div>
      {/* Show error messages */}
      {result?.type === "error" && <p style={{ color: "red" }}>{result.message}</p>}
      {result?.type === "success" && <p style={{ color: "green" }}>{result.message}</p>}

      <form action={submitAction}>
        <label>
          Username:
          <input type="text" name="username" required disabled={isPending} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required disabled={isPending} />
        </label>
        <br />
        <button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}